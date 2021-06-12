import { EventEmitter } from 'betsy'
import isPlainObject from 'is-plain-obj'
import * as proxyStateTree from 'proxy-state-tree'
import { Derived, IS_DERIVED, IS_DERIVED_CONSTRUCTOR } from './derived'
import { Devtools, DevtoolsMessage } from './Devtools'
import * as internalTypes from './internalTypes'
import { proxifyEffects } from './proxyfyEffects'
import { rehydrate } from './rehydrate'
import { IConfiguration, IReaction, IContext } from './types'
import * as utils from './utils'

const hotReloadingCache = {}

export class Overmind<ThisConfig extends IConfiguration>
  implements IConfiguration {
  private proxyStateTreeInstance: proxyStateTree.ProxyStateTree<object>
  private actionReferences: { [path: string]: Function } = {}
  private nextExecutionId: number = 0
  private mode:
    | internalTypes.DefaultMode
    | internalTypes.TestMode
    | internalTypes.SSRMode

  private reydrateMutationsForHotReloading: proxyStateTree.IMutation[] = []
  private originalConfiguration
  private isStrict = false
  initialized: Promise<any>
  eventHub: EventEmitter<internalTypes.Events>
  devtools: Devtools
  actions: {
    [K in keyof ThisConfig['actions']]: internalTypes.ResolveAction<
      ThisConfig['actions'][K]
    >
  }

  state: ThisConfig['state']
  effects: ThisConfig['effects'] & {}
  delimiter: string
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
      if (hotReloadingCache[name]) {
        return hotReloadingCache[name].reconfigure(configuration)
      } else {
        hotReloadingCache[name] = this
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
          proxyStateTreeInstance.sourceState,
          configuration.actions
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

      let nextTick
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
          this.reydrateMutationsForHotReloading = this.reydrateMutationsForHotReloading.concat(
            execution.mutations
          )
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
          ? (path, value) => {
              this.eventHub.emitAsync(internalTypes.EventType.GETTER, {
                path,
                value,
              })
            }
          : undefined,
      }
    )

    return proxyStateTreeInstance
  }

  private createExecution(name, action, parentExecution) {
    const namespacePath = name.split('.')

    namespacePath.pop()

    if (utils.ENVIRONMENT === 'production') {
      return ({
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
      } as any) as internalTypes.Execution
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
      onFlush: (cb) => {
        return this.proxyStateTreeInstance.onFlush(cb)
      },
      scopeValue: (value, tree) => {
        return this.scopeValue(value, tree)
      },
    }

    return execution
  }

  private createContext(execution, tree) {
    return {
      state: tree.state,
      actions: utils.createActionsProxy(this.actions, (action) => {
        return (value) => action(value, execution.isRunning ? execution : null)
      }),
      execution,
      proxyStateTree: this.proxyStateTreeInstance,
      effects: this.trackEffects(this.effects, execution),
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
      const stateTarget = path.reduce((aggr, key) => aggr[key], state)
      stateTarget[namespaceKey] = utils.processState(configuration.state)
    }
    if (configuration.actions) {
      const actionsTarget = path.reduce((aggr, key) => aggr[key], this.actions)
      actionsTarget[namespaceKey] = this.getActions(configuration.actions)
    }
    if (configuration.effects) {
      const effectsTarget = path.reduce((aggr, key) => aggr[key], this.effects)
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

  private createAction(name, originalAction) {
    this.actionReferences[name] = originalAction
    const actionFunc = (value?, boundExecution?: internalTypes.Execution) => {
      const action = this.actionReferences[name]
      // Developer might unintentionally pass more arguments, so have to ensure
      // that it is an actual execution
      boundExecution =
        boundExecution && boundExecution[utils.EXECUTION]
          ? boundExecution
          : undefined

      if (
        utils.ENVIRONMENT === 'production' ||
        action[utils.IS_OPERATOR] ||
        this.mode.mode === utils.MODE_SSR
      ) {
        const execution = this.createExecution(name, action, boundExecution)
        this.eventHub.emit(internalTypes.EventType.ACTION_START, {
          ...execution,
          value,
        })

        if (action[utils.IS_OPERATOR]) {
          return new Promise((resolve, reject) => {
            action(
              null,
              {
                ...this.createContext(execution, this.proxyStateTreeInstance),
                value,
              },
              (err, finalContext) => {
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
      } else {
        const execution = {
          ...this.createExecution(name, action, boundExecution),
          operatorId: 0,
          type: 'action',
        }
        this.eventHub.emit(internalTypes.EventType.ACTION_START, {
          ...execution,
          value,
        })
        this.eventHub.emit(internalTypes.EventType.OPERATOR_START, execution)

        const mutationTree = execution.getMutationTree()
        if (this.isStrict) {
          mutationTree.blockMutations()
        }
        mutationTree.onMutation((mutation) => {
          this.eventHub.emit(internalTypes.EventType.MUTATIONS, {
            ...execution,
            mutations: [mutation],
          })
        })

        const scopedValue = this.scopeValue(value, mutationTree)
        const context = this.createContext(execution, mutationTree)

        try {
          let pendingFlush
          mutationTree.onMutation((mutation) => {
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

          let result = action(context, scopedValue)

          if (utils.isPromise(result)) {
            this.eventHub.emit(
              internalTypes.EventType.OPERATOR_ASYNC,
              execution
            )
            result = result
              .then((promiseResult) => {
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
              .catch((error) => {
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
            error: err.message,
          })
          this.eventHub.emit(internalTypes.EventType.ACTION_END, execution)
          throw err
        }
      }
    }

    return actionFunc
  }

  private trackEffects(effects = {}, execution) {
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
          error: error.message,
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
          .then((promisedResult) => {
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
          .catch((error) => {
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
        result: result,
        isPending: false,
        error: false,
      })

      return result
    })
  }

  private initializeDevtools(host, name, eventHub, initialState, actions) {
    if (utils.ENVIRONMENT === 'production') return
    const devtools = new Devtools(name)
    devtools.connect(
      host,
      (message: DevtoolsMessage) => {
        switch (message.type) {
          case 'refresh': {
            location.reload()
            break
          }
          case 'executeAction': {
            const action = message.data.name
              .split('.')
              .reduce((aggr, key) => aggr[key], this.actions)
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
            const state = path.reduce((aggr, key) => aggr[key], tree.state)

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
      }
    )
    for (const type in internalTypes.EventType) {
      eventHub.on(
        internalTypes.EventType[type],
        ((eventType) => (data) => {
          devtools.send({
            type: internalTypes.EventType[type],
            data,
          })

          if (eventType === internalTypes.EventType.MUTATIONS) {
            // We want to trigger property access when setting objects and arrays, as any derived set would
            // then trigger and update the devtools
            data.mutations.forEach((mutation) => {
              const value = mutation.path
                .split(this.delimiter)
                .reduce(
                  (aggr, key) => aggr[key],
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
              (aggr, key) => aggr[key],
              this.proxyStateTreeInstance.state
            )
          }
        })(internalTypes.EventType[type])
      )
    }
    devtools.send({
      type: 'init',
      data: {
        state: this.proxyStateTreeInstance.state,
        actions: utils.getActionPaths(actions),
        delimiter: this.delimiter,
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

  private getActions(actions: any = {}, path: string[] = []) {
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
          const target = path.reduce((aggr, key) => {
            if (!aggr[key]) {
              aggr[key] = {}
            }

            return aggr[key]
          }, this.actions)
          target[name] = this.createAction(actionName, actions[name]) as any

          target[name].displayName = path.concat(name).join('.')
        }
      } else {
        this.updateActions(actions[name], path.concat(name))
      }
    }, {}) as any
  }

  getTrackStateTree(): proxyStateTree.ITrackStateTree<any> {
    return this.proxyStateTreeInstance.getTrackStateTree()
  }

  getMutationTree(): proxyStateTree.IMutationTree<any> {
    return this.proxyStateTreeInstance.getMutationTree()
  }

  reaction: IReaction<IContext<ThisConfig>> = (
    stateCallback,
    updateCallback,
    options = {}
  ) => {
    let disposer

    if (options.nested) {
      const value = stateCallback(this.state)

      if (!value || !value[proxyStateTree.IS_PROXY]) {
        throw new Error(
          'You have to return an object or array from the Overmind state when using a "nested" reaction'
        )
      }

      const path = value[proxyStateTree.PATH]

      disposer = this.addFlushListener((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.path.startsWith(path)) {
            updateCallback(
              path
                ? path
                    .split(this.delimiter)
                    .reduce((aggr, key) => aggr[key], this.state)
                : this.state
            )
          }
        })
      })
    } else {
      const tree = this.proxyStateTreeInstance.getTrackStateTree()
      let returnValue
      const updateReaction = () => {
        tree.trackScope(
          () => (returnValue = stateCallback(tree.state as any)),
          () => {
            updateReaction()
            updateCallback(returnValue)
          }
        )
      }

      updateReaction()

      disposer = () => {
        tree.dispose()
      }
    }

    if (options.immediate) {
      updateCallback(stateCallback(this.state as any))
    }

    return disposer
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
    rehydrate(mutationTree.state as any, changeMutations)

    // We run any mutations ran during the session, it might fail though
    // as the state structure might have changed, but no worries we just
    // ignore that
    this.reydrateMutationsForHotReloading.forEach((mutation) => {
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
        },
      })
    }

    return this
  }
}
