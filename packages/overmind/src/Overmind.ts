import { EventEmitter } from 'betsy'
import isPlainObject from 'is-plain-obj'
import * as proxyStateTree from 'proxy-state-tree'
import { Derived, IS_DERIVED, IS_DERIVED_CONSTRUCTOR } from './derived'
import { Devtools, DevtoolsMessage } from './Devtools'
import * as internalTypes from './internalTypes'
import { proxifyEffects } from './proxyfyEffects'
import { rehydrate } from './rehydrate'
import { IConfiguration, IContext, IReaction } from './types'
import * as utils from './utils'

const hotReloadingCache = {}

export class Overmind<
  ThisConfig extends IConfiguration,
> implements IConfiguration {
  private proxyStateTreeInstance!: proxyStateTree.ProxyStateTree<
    object,
    Devtools | undefined
  >
  private actionReferences: { [path: string]: Function } = {}
  private nextExecutionId: number = 0
  private mode!:
    | internalTypes.DefaultMode
    | internalTypes.TestMode
    | internalTypes.SSRMode

  private rehydrateMutationsForHotReloading: proxyStateTree.IMutation[] = []
  private originalConfiguration: any
  private isStrict = false
  initialized!: Promise<any>
  eventHub!: EventEmitter<internalTypes.Events>
  devtools!: Devtools
  actions!: {
    [K in keyof ThisConfig['actions']]: internalTypes.ResolveAction<
      ThisConfig['actions'][K]
    >
  }

  state!: ThisConfig['state']
  effects!: ThisConfig['effects'] & {}
  delimiter!: string
  constructor(
    configuration: ThisConfig,
    options: internalTypes.Options = {},
    mode:
      | internalTypes.DefaultMode
      | internalTypes.TestMode
      | internalTypes.SSRMode = {
      mode: utils.MODE_DEFAULT,
    } as internalTypes.DefaultMode
  ) {
    const name = options.name || 'OvermindApp'
    const devEnv = options.devEnv || 'development'
    const isNode =
      typeof process !== 'undefined' &&
      process.title &&
      process.title.includes('node')

    this.delimiter = options.delimiter || '.'
    this.isStrict = Boolean(options.strict)

    if (
      utils.ENVIRONMENT === devEnv &&
      mode.mode === utils.MODE_DEFAULT &&
      options.hotReloading !== false &&
      !isNode
    ) {
      if ((hotReloadingCache as any)[name]) {
        return (hotReloadingCache as any)[name].reconfigure(configuration)
      } else {
        (hotReloadingCache as any)[name] = this
      }
    }

    /*
      Set up an eventHub to trigger information from derived, computed and reactions
    */
    const eventHub =
      mode.mode === utils.MODE_SSR
        ? new utils.MockedEventEmitter()
        : new EventEmitter<internalTypes.Events>()

    /*
      Create the proxy state tree instance with the state and a wrapper to expose
      the eventHub
    */
    const proxyStateTreeInstance = this.createProxyStateTree(
      configuration,
      eventHub,
      mode.mode === utils.MODE_TEST || utils.ENVIRONMENT === devEnv,
      mode.mode === utils.MODE_SSR
    )
    this.originalConfiguration = configuration
    this.state = proxyStateTreeInstance.state
    this.effects = configuration.effects || {}
    this.proxyStateTreeInstance = proxyStateTreeInstance
    this.eventHub = eventHub as EventEmitter<internalTypes.Events>
    this.mode = mode

    /*
      Expose the created actions
    */
    this.actions = this.getActions(configuration.actions)

    if (mode.mode === utils.MODE_SSR) {
      return
    }

    if (
      utils.ENVIRONMENT === devEnv &&
      mode.mode === utils.MODE_DEFAULT &&
      typeof window !== 'undefined'
    ) {
      let warning = 'OVERMIND: You are running in DEVELOPMENT mode.'
      if (options.logProxies !== true) {
        const originalConsoleLog = console.log

        console.log = (...args) =>
          originalConsoleLog.apply(
            console,
            args.map((arg) =>
              arg && arg[proxyStateTree.IS_PROXY]
                ? arg[proxyStateTree.VALUE]
                : arg
            )
          )
        warning +=
          '\n\n - To improve debugging experience "console.log" will NOT log proxies from Overmind, but the actual value. Please see docs to turn off this behaviour'
      }

      if (
        options.devtools ||
        (typeof location !== 'undefined' &&
          location.hostname === 'localhost' &&
          options.devtools !== false)
      ) {
        const host =
          options.devtools === true ? 'localhost:3031' : options.devtools
        const name = options.name
          ? options.name
          : typeof document === 'undefined'
            ? 'NoName'
            : document.title || 'NoName'

        this.initializeDevtools(
          host,
          name,
          eventHub,
          configuration.actions,
          options.devtoolsLogLevel
        )
      } else if (options.devtools !== false) {
        warning +=
          '\n\n - You are not running on localhost. You will have to manually define the devtools option to connect'
      }

      if (!utils.IS_TEST) {
        console.warn(warning)
      }
    }

    if (
      utils.ENVIRONMENT === 'production' &&
      mode.mode === utils.MODE_DEFAULT
    ) {
      eventHub.on(internalTypes.EventType.OPERATOR_ASYNC, (execution) => {
        if (
          !execution.parentExecution ||
          !execution.parentExecution.isRunning
        ) {
          proxyStateTreeInstance.getMutationTree().flush(true)
        }
      })
      eventHub.on(internalTypes.EventType.ACTION_END, (execution) => {
        if (!execution.parentExecution || !execution.parentExecution.isRunning)
          proxyStateTreeInstance.getMutationTree().flush()
      })

      let nextTick: any
      const flushTree = () => {
        proxyStateTreeInstance.getMutationTree().flush(true)
      }

      this.proxyStateTreeInstance.onMutation(() => {
        nextTick && clearTimeout(nextTick)
        nextTick = setTimeout(flushTree, 0)
      })
    } else if (
      mode.mode === utils.MODE_DEFAULT ||
      mode.mode === utils.MODE_TEST
    ) {
      if (
        utils.ENVIRONMENT === 'test' ||
        (this.devtools && options.hotReloading !== false)
      ) {
        eventHub.on(internalTypes.EventType.MUTATIONS, (execution) => {
          this.rehydrateMutationsForHotReloading =
            this.rehydrateMutationsForHotReloading.concat(execution.mutations)
        })
      }
      eventHub.on(internalTypes.EventType.OPERATOR_ASYNC, (execution) => {
        if (
          !execution.parentExecution ||
          !execution.parentExecution.isRunning
        ) {
          const flushData = execution.flush(true)
          if (this.devtools && flushData.mutations.length) {
            this.devtools.send({
              type: 'flush',
              data: {
                ...execution,
                ...flushData,
              },
            })
          }
        }
      })
      eventHub.on(internalTypes.EventType.ACTION_END, (execution) => {
        if (
          !execution.parentExecution ||
          !execution.parentExecution.isRunning
        ) {
          const flushData = execution.flush()

          if (this.devtools && flushData.mutations.length) {
            this.devtools.send({
              type: 'flush',
              data: {
                ...execution,
                ...flushData,
              },
            })
          }
        }
      })
    }

    if (mode.mode === utils.MODE_DEFAULT) {
      const onInitialize = this.createAction(
        'onInitialize',
        utils.createOnInitialize()
      ) as any

      this.initialized = Promise.resolve(onInitialize(this))
    } else {
      this.initialized = Promise.resolve(null)
    }
  }

  private currentExecution: internalTypes.Execution | null = null

  private getCurrentExecution() {
    return this.currentExecution
  }

  private createProxyStateTree(
    configuration: IConfiguration,
    eventHub: EventEmitter<any> | utils.MockedEventEmitter,
    devmode: boolean,
    ssr: boolean
  ) {
    const proxyStateTreeInstance = new proxyStateTree.ProxyStateTree(
      this.getState(configuration) as any,
      {
        devmode: devmode && !ssr,
        ssr,
        delimiter: this.delimiter,
        transformPath: (path: string) => {
          const execution = this.getCurrentExecution()
          if (!execution?.namespacePath?.length) {
            return path // No namespace, no transformation
          }

          if (!path) {
            return path
          }

          const pathSegments = path.split(this.delimiter)
          const firstSegment = pathSegments[0]

          // Get root level keys to detect absolute paths
          const rootKeys =
            this.state && typeof this.state === 'object'
              ? Object.keys(this.state)
              : []

          // Absolute paths start with a root key - don't transform
          if (rootKeys.includes(firstSegment)) {
            return path
          }

          // Relative path - prepend namespace
          const namespace = execution.namespacePath.join(this.delimiter)
          return namespace + this.delimiter + path
        },
        onSetFunction: (tree, path, target, prop, func) => {
          if (func[IS_DERIVED_CONSTRUCTOR]) {
            return new Derived(func) as any
          }

          return func
        },
        onGetFunction: (tree, path, target, prop) => {
          const func = target[prop]

          if (func[IS_DERIVED]) {
            return func(
              eventHub,
              tree,
              proxyStateTreeInstance,
              path.split(this.delimiter)
            )
          }

          if (func[IS_DERIVED_CONSTRUCTOR]) {
            const derived = new Derived(func) as any
            target[prop] = derived

            return derived(
              eventHub,
              tree,
              proxyStateTreeInstance,
              path.split(this.delimiter)
            )
          }

          return func
        },
        onGetter: devmode
          ? (path: any, value: any) => {
              this.eventHub.emitAsync(internalTypes.EventType.GETTER, {
                path,
                value,
              })
            }
          : undefined,
        getDevtools: () => {
          // If in development mode return DevTools instance
          if (devmode && !ssr && this.devtools) {
            return this.devtools
          }
        },
      }
    )

    return proxyStateTreeInstance
  }

  private createExecution(name: any, action: any, parentExecution: any): any {
    const namespacePath = name.split('.')

    namespacePath.pop()

    if (utils.ENVIRONMENT === 'production') {
      return {
        [utils.EXECUTION]: true,
        parentExecution,
        namespacePath,
        actionName: name,
        getMutationTree: () => {
          return this.proxyStateTreeInstance.getMutationTree()
        },
        getTrackStateTree: () => {
          return this.proxyStateTreeInstance.getTrackStateTree()
        },
        emit: this.eventHub.emit.bind(this.eventHub),
      } as any as internalTypes.Execution
    }

    const mutationTrees: any[] = []
    const execution = {
      [utils.EXECUTION]: true,
      namespacePath,
      actionId: name,
      executionId: this.nextExecutionId++,
      actionName: name,
      operatorId: 0,
      isRunning: true,
      parentExecution,
      path: [],
      emit: this.eventHub.emit.bind(this.eventHub),
      send: this.devtools ? this.devtools.send.bind(this.devtools) : () => {},
      trackEffects: this.trackEffects.bind(this, this.effects),
      getNextOperatorId: (() => {
        let currentOperatorId = 0
        return () => ++currentOperatorId
      })(),
      flush: parentExecution
        ? parentExecution.flush
        : (isAsync?: boolean) => {
            return this.proxyStateTreeInstance.flush(mutationTrees, isAsync)
          },
      getMutationTree: parentExecution
        ? parentExecution.getMutationTree
        : () => {
            const mutationTree = this.proxyStateTreeInstance.getMutationTree()

            mutationTrees.push(mutationTree)

            return mutationTree
          },
      getTrackStateTree: () => {
        return this.proxyStateTreeInstance.getTrackStateTree()
      },
      onFlush: (cb: any) => {
        return this.proxyStateTreeInstance.onFlush(cb)
      },
      scopeValue: (value: any, tree: any) => {
        return this.scopeValue(value, tree)
      },
    }

    return execution
  }

  private createScopedProxy(target: any, namespacePath: string[]): any {
    if (!namespacePath.length) {
      return target
    }

    return new Proxy(target, {
      get: (obj, prop) => {
        // Allow direct access to symbols and internal properties
        if (typeof prop === 'symbol' || String(prop).startsWith('__')) {
          return obj[prop]
        }

        const namespaceObj = namespacePath.reduce(
          (aggr, key) => aggr?.[key],
          obj
        )

        // If the entire namespace is a StateMachine
        if (utils.isStateMachine(namespaceObj)) {
          if (prop in namespaceObj) {
            const value = namespaceObj[prop]
            if (prop in obj && utils.isStateMachine(obj[prop])) {
              return obj[prop]
            }

            if (typeof value === 'function') {
              return value.bind(namespaceObj)
            }
            return value
          }
          return obj[prop]
        }

        // Standard scoping for actions/effects
        const value =
          namespaceObj && prop in namespaceObj ? namespaceObj[prop] : obj[prop]

        // Bind functions to maintain correct 'this' context
        if (
          namespaceObj &&
          prop in namespaceObj &&
          typeof value === 'function'
        ) {
          return value.bind(namespaceObj)
        }

        return value
      },

      has: (obj, prop) => {
        const namespaceObj = namespacePath.reduce(
          (aggr, key) => aggr?.[key],
          obj
        )
        return (namespaceObj && prop in namespaceObj) || prop in obj
      },

      ownKeys: (obj) => {
        const namespaceObj = namespacePath.reduce(
          (aggr, key) => aggr?.[key],
          obj
        )

        if (utils.isStateMachine(namespaceObj)) {
          return Object.keys(namespaceObj)
        }

        const namespaceKeys = namespaceObj ? Object.keys(namespaceObj) : []
        const rootKeys = Object.keys(obj)
        return Array.from(new Set([...namespaceKeys, ...rootKeys]))
      },

      getOwnPropertyDescriptor: (obj, prop) => {
        const namespaceObj = namespacePath.reduce(
          (aggr, key) => aggr?.[key],
          obj
        )

        if (namespaceObj && prop in namespaceObj) {
          return (
            Object.getOwnPropertyDescriptor(namespaceObj, prop) || {
              configurable: true,
              enumerable: true,
            }
          )
        }

        return (
          Object.getOwnPropertyDescriptor(obj, prop) || {
            configurable: true,
            enumerable: true,
          }
        )
      },
    })
  }

  private createContext(execution: any, tree: any): any {
    const namespacePath = execution.namespacePath || []

    const actionsProxy = utils.createActionsProxy(this.actions, (action: any) => {
      return (value: any) => action(value, execution.isRunning ? execution : null)
    })

    return {
      state: tree.state,
      actions: namespacePath.length
        ? this.createScopedProxy(actionsProxy, namespacePath)
        : actionsProxy,
      execution,
      proxyStateTree: this.proxyStateTreeInstance,
      effects: namespacePath.length
        ? this.createScopedProxy(
            this.trackEffects(this.effects, execution),
            namespacePath
          )
        : this.trackEffects(this.effects, execution),
      addNamespace: this.addNamespace.bind(this),
      reaction: this.reaction.bind(this),
      addMutationListener: this.addMutationListener.bind(this),
      addFlushListener: this.addFlushListener.bind(this),
    }
  }

  private addNamespace(
    configuration: IConfiguration,
    path: string[],
    existingState?: any
  ) {
    const state = existingState || this.state
    const namespaceKey = path.pop()!

    if (configuration.state) {
      const stateTarget = path.reduce((aggr: any, key) => aggr[key], state)
      stateTarget[namespaceKey] = utils.processState(configuration.state)
    }
    if (configuration.actions) {
      const actionsTarget = path.reduce((aggr: any, key) => aggr[key], this.actions)
      actionsTarget[namespaceKey] = this.getActions(configuration.actions)
    }
    if (configuration.effects) {
      const effectsTarget = path.reduce((aggr: any, key) => aggr[key], this.effects)
      effectsTarget[namespaceKey] = configuration.effects
    }
  }

  private scopeValue(value: any, tree: proxyStateTree.TTree) {
    if (!value) {
      return value
    }
    if (value[proxyStateTree.IS_PROXY]) {
      return this.proxyStateTreeInstance.rescope(value, tree)
    } else if (isPlainObject(value)) {
      return Object.assign(
        {},
        ...Object.keys(value).map((key) => ({
          [key]: this.proxyStateTreeInstance.rescope(value[key], tree),
        }))
      )
    } else {
      return value
    }
  }

  private addExecutionMutation(mutation: proxyStateTree.IMutation) {
    ;(this as any).mutations.push(mutation)
  }

  private createAction(name: any, originalAction: any): any {
    this.actionReferences[name] = originalAction
    const actionFunc = (value?: any, boundExecution?: internalTypes.Execution) => {
      const action = this.actionReferences[name]
      boundExecution =
        boundExecution && (boundExecution as any)[utils.EXECUTION]
          ? boundExecution
          : undefined

      if (
        utils.ENVIRONMENT === 'production' ||
        (action as any)[utils.IS_OPERATOR] ||
        this.mode.mode === utils.MODE_SSR
      ) {
        const execution = this.createExecution(name, action, boundExecution)

        const previousExecution = this.currentExecution
        this.currentExecution = execution

        try {
          this.eventHub.emit(internalTypes.EventType.ACTION_START, {
            ...execution,
            value,
          })

          if ((action as any)[utils.IS_OPERATOR]) {
            return new Promise((resolve, reject) => {
              action(
                null,
                {
                  ...this.createContext(execution, this.proxyStateTreeInstance),
                  value,
                },
                (err: any, finalContext: any) => {
                  execution.isRunning = false
                  finalContext &&
                    this.eventHub.emit(internalTypes.EventType.ACTION_END, {
                      ...finalContext.execution,
                      operatorId: finalContext.execution.operatorId - 1,
                    })
                  if (err) reject(err)
                  else {
                    resolve(finalContext.value)
                  }
                }
              )
            }).finally(() => {
              this.currentExecution = previousExecution
            })
          } else {
            const mutationTree = execution.getMutationTree()
            if (this.isStrict) {
              mutationTree.blockMutations()
            }
            const returnValue = action(
              this.createContext(execution, mutationTree),
              value
            )

            this.eventHub.emit(internalTypes.EventType.ACTION_END, execution)

            return returnValue
          }
        } finally {
          if (!(action as any)[utils.IS_OPERATOR]) {
            this.currentExecution = previousExecution
          }
        }
      } else {
        const execution = {
          ...this.createExecution(name, action, boundExecution),
          operatorId: 0,
          type: 'action',
        }

        const previousExecution = this.currentExecution
        this.currentExecution = execution

        this.eventHub.emit(internalTypes.EventType.ACTION_START, {
          ...execution,
          value,
        })
        this.eventHub.emit(internalTypes.EventType.OPERATOR_START, execution)

        const mutationTree = execution.getMutationTree()
        if (this.isStrict) {
          mutationTree.blockMutations()
        }
        mutationTree.onMutation((mutation: any) => {
          this.eventHub.emit(internalTypes.EventType.MUTATIONS, {
            ...execution,
            mutations: [mutation],
          })
        })

        const scopedValue = this.scopeValue(value, mutationTree)
        const context = this.createContext(execution, mutationTree)

        let result
        let isAsync = false

        try {
          let pendingFlush: any
          mutationTree.onMutation((mutation: any) => {
            if (pendingFlush) {
              clearTimeout(pendingFlush)
            }

            if (this.mode.mode === utils.MODE_TEST) {
              this.addExecutionMutation(mutation)
            } else if (this.mode.mode === utils.MODE_DEFAULT) {
              pendingFlush = setTimeout(() => {
                pendingFlush = null
                const flushData = execution.flush(true)

                if (this.devtools && flushData.mutations.length) {
                  this.devtools.send({
                    type: 'flush',
                    data: {
                      ...execution,
                      ...flushData,
                      mutations: flushData.mutations,
                    },
                  })
                }
              })
            }
          })

          result = action(context, scopedValue)
          isAsync = utils.isPromise(result)

          if (isAsync) {
            this.eventHub.emit(
              internalTypes.EventType.OPERATOR_ASYNC,
              execution
            )
            result = result
              .then((promiseResult: any) => {
                execution.isRunning = false
                if (!boundExecution) {
                  mutationTree.dispose()
                }
                this.eventHub.emit(internalTypes.EventType.OPERATOR_END, {
                  ...execution,
                  isAsync: true,
                  result: undefined,
                })
                this.eventHub.emit(
                  internalTypes.EventType.ACTION_END,
                  execution
                )

                return promiseResult
              })
              .catch((error: any) => {
                execution.isRunning = false
                if (!boundExecution) {
                  mutationTree.dispose()
                }
                this.eventHub.emit(internalTypes.EventType.OPERATOR_END, {
                  ...execution,
                  isAsync: true,
                  result: undefined,
                  error: error.message,
                })
                this.eventHub.emit(
                  internalTypes.EventType.ACTION_END,
                  execution
                )

                throw error
              })
              .finally(() => {
                this.currentExecution = previousExecution
              })
          } else {
            execution.isRunning = false
            if (!boundExecution) {
              mutationTree.dispose()
            }
            this.eventHub.emit(internalTypes.EventType.OPERATOR_END, {
              ...execution,
              isAsync: false,
              result: undefined,
            })
            this.eventHub.emit(internalTypes.EventType.ACTION_END, execution)
          }

          return result
        } catch (err) {
          this.eventHub.emit(internalTypes.EventType.OPERATOR_END, {
            ...execution,
            isAsync: false,
            result: undefined,
            error: (err as any).message,
          })
          this.eventHub.emit(internalTypes.EventType.ACTION_END, execution)
          throw err
        } finally {
          if (!isAsync) {
            this.currentExecution = previousExecution
          }
        }
      }
    }

    return actionFunc
  }

  private trackEffects(effects = {}, execution: any): any {
    if (utils.ENVIRONMENT === 'production') {
      return effects
    }

    return proxifyEffects(this.effects, (effect) => {
      let result
      try {
        if (this.mode.mode === utils.MODE_TEST) {
          const mode = this.mode as internalTypes.TestMode
          result = mode.options.effectsCallback(effect)
        } else {
          this.eventHub.emit(internalTypes.EventType.EFFECT, {
            ...execution,
            ...effect,
            args: effect.args,
            isPending: true,
            error: false,
          })
          result = effect.func.apply(this, effect.args)
        }
      } catch (error) {
        this.eventHub.emit(internalTypes.EventType.EFFECT, {
          ...execution,
          ...effect,
          args: effect.args,
          isPending: false,
          error: (error as any).message,
        })
        throw error
      }

      if (utils.isPromise(result)) {
        this.eventHub.emit(internalTypes.EventType.EFFECT, {
          ...execution,
          ...effect,
          args: effect.args,
          isPending: true,
          error: false,
        })

        return result
          .then((promisedResult: any) => {
            this.eventHub.emit(internalTypes.EventType.EFFECT, {
              ...execution,
              ...effect,
              args: effect.args,
              result: promisedResult,
              isPending: false,
              error: false,
            })

            return promisedResult
          })
          .catch((error: any) => {
            this.eventHub.emit(internalTypes.EventType.EFFECT, {
              ...execution,
              ...effect,
              args: effect.args,
              isPending: false,
              error: error && error.message,
            })
            throw error
          })
      }

      this.eventHub.emit(internalTypes.EventType.EFFECT, {
        ...execution,
        ...effect,
        args: effect.args,
        result,
        isPending: false,
        error: false,
      })

      return result
    })
  }

  private initializeDevtools(
    host: any,
    name: any,
    eventHub: any,
    actions: any,
    logLevel: internalTypes.LogLevel = 'error'
  ) {
    if (utils.ENVIRONMENT === 'production') return
    const devtools = new Devtools(name, logLevel)
    devtools.connect(host, ((message: DevtoolsMessage) => {
      switch (message.type) {
        case 'refresh': {
          location.reload()
          break
        }
        case 'executeAction': {
          const action = message.data.name
            .split('.')
            .reduce((aggr: any, key: any) => aggr[key], this.actions)
          message.data.payload
            ? action(JSON.parse(message.data.payload))
            : action()
          break
        }
        case 'mutation': {
          const tree = this.proxyStateTreeInstance.getMutationTree()
          const path = message.data.path.slice()
          const value = JSON.parse(`{ "value": ${message.data.value} }`).value
          const key = path.pop()
          const state = path.reduce((aggr: any, key: any) => aggr[key], tree.state)

          state[key] = value
          tree.flush(true)
          tree.dispose()
          this.devtools.send({
            type: 'state',
            data: {
              path: message.data.path,
              value,
            },
          })
          break
        }
      }
    }) as any)
    for (const type in internalTypes.EventType) {
      eventHub.on(
        (internalTypes.EventType as any)[type],
        ((eventType) => (data: any) => {
          devtools.send({
            type: (internalTypes.EventType as any)[type],
            data,
          })

          if (eventType === internalTypes.EventType.MUTATIONS) {
            // We want to trigger property access when setting objects and arrays, as any derived set would
            // then trigger and update the devtools
            data.mutations.forEach((mutation: any) => {
              const value = mutation.path
                .split(this.delimiter)
                .reduce(
                  (aggr: any, key: any) => aggr[key],
                  this.proxyStateTreeInstance.state
                )
              if (isPlainObject(value)) {
                Object.keys(value).forEach((key) => value[key])
              } else if (Array.isArray(value)) {
                value.forEach((item) => {
                  if (isPlainObject(item)) {
                    Object.keys(item).forEach((key) => item[key])
                  }
                })
              }
            })
          }

          // Access the derived which will trigger calculation and devtools
          if (eventType === internalTypes.EventType.DERIVED_DIRTY) {
            data.derivedPath.reduce(
              (aggr: any, key: any) => aggr[key],
              this.proxyStateTreeInstance.state
            )
          }
        })((internalTypes.EventType as any)[type])
      )
    }
    devtools.send({
      type: 'init',
      data: {
        state: this.proxyStateTreeInstance.state,
        actions: utils.getActionPaths(actions),
        delimiter: this.delimiter,
        features: {
          transitions: true,
          charts: utils.detectStateCharts(this.state),
        },
      },
    })
    this.devtools = devtools
  }

  private getState(configuration: IConfiguration) {
    let state = {}
    if (configuration.state) {
      state = utils.processState(configuration.state)
    }

    return state
  }

  private getActions(actions: any = {}, path: string[] = []): any {
    return Object.keys(actions).reduce((aggr, name) => {
      if (typeof actions[name] === 'function') {
        const action = this.createAction(
          path.concat(name).join('.'),
          actions[name]
        ) as any

        action.displayName = path.concat(name).join('.')

        return Object.assign(aggr, {
          [name]: action,
        })
      }

      return Object.assign(aggr, {
        [name]: this.getActions(actions[name], path.concat(name)),
      })
    }, {}) as any
  }

  /*
    Related to hot reloading we update the existing action references and add any new
    actions.
  */
  private updateActions(actions: any = {}, path: string[] = []) {
    Object.keys(actions).forEach((name) => {
      if (typeof actions[name] === 'function') {
        const actionName = path.concat(name).join('.')
        if (this.actionReferences[actionName]) {
          this.actionReferences[actionName] = actions[name]
        } else {
          const target = path.reduce((aggr: any, key) => {
            if (!(aggr as any)[key]) {
              (aggr as any)[key] = {}
            }

            return (aggr as any)[key]
          }, this.actions)
          target[name] = this.createAction(actionName, actions[name]) as any

          target[name].displayName = path.concat(name).join('.')
        }
      } else {
        this.updateActions(actions[name], path.concat(name))
      }
    }, {}) as any
  }

  getTrackStateTree(): proxyStateTree.ITrackStateTree<
    object,
    Devtools | undefined
  > {
    return this.proxyStateTreeInstance.getTrackStateTree()
  }

  getMutationTree(): proxyStateTree.IMutationTree<
    object,
    Devtools | undefined
  > {
    return this.proxyStateTreeInstance.getMutationTree()
  }

  reaction: IReaction<IContext<ThisConfig>> = (
    stateCallback,
    updateCallback,
    options = {}
  ) => {
    let disposer: any

    if (options.nested) {
      const value = stateCallback(this.state)

      if (!value || !(value as any)[proxyStateTree.IS_PROXY]) {
        throw new Error(
          'You have to return an object or array from the Overmind state when using a "nested" reaction'
        )
      }

      const path = (value as any)[proxyStateTree.PATH]

      disposer = this.addFlushListener((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.path.startsWith(path)) {
            updateCallback(
              path
                ? path
                    .split(this.delimiter)
                    .reduce((aggr: any, key: any) => aggr[key], this.state)
                : this.state
            )
          }
        })
      })
    } else {
      const tree = this.proxyStateTreeInstance.getTrackStateTree()
      let returnValue: any
      const updateReaction = () => {
        disposer?.()

        tree.trackScope(() => (returnValue = stateCallback(tree.state as any)))
        disposer = tree.subscribe(() => {
          updateReaction()
          updateCallback(returnValue)
        })
      }

      updateReaction()
    }

    if (options.immediate) {
      updateCallback(stateCallback(this.state as any))
    }

    return () => disposer?.()
  }

  addMutationListener = (cb: proxyStateTree.IMutationCallback) => {
    return this.proxyStateTreeInstance.onMutation(cb)
  }

  addFlushListener = (cb: proxyStateTree.IFlushCallback) => {
    return this.proxyStateTreeInstance.onFlush(cb)
  }

  reconfigure(configuration: IConfiguration) {
    const changeMutations = utils.getChangeMutations(
      this.originalConfiguration.state,
      configuration.state || {}
    )

    this.updateActions(configuration.actions)
    this.effects = configuration.effects || {}

    const mutationTree = this.proxyStateTreeInstance.getMutationTree()
    // We change the state to match the new structure
    rehydrate(mutationTree.state as object, changeMutations)

    // We run any mutations ran during the session, it might fail though
    // as the state structure might have changed, but no worries we just
    // ignore that
    this.rehydrateMutationsForHotReloading.forEach((mutation) => {
      try {
        rehydrate(mutationTree.state as any, [mutation])
      } catch (error) {
        // No worries, structure changed and we do not want to mutate anyways
      }
    })

    mutationTree.flush()
    mutationTree.dispose()

    if (this.devtools) {
      this.devtools.send({
        type: 're_init',
        data: {
          state: this.state,
          actions: utils.getActionPaths(configuration.actions),
          features: {
            transitions: true,
            charts: utils.detectStateCharts(this.state),
          },
        },
      })
    }

    return this
  }
}
