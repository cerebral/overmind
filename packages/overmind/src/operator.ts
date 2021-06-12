import { EventType, Execution, OperatorContextFunction } from './internalTypes'
import { IConfiguration, IContext } from './types'
import {
  IS_OPERATOR,
  MODE_TEST,
  ORIGINAL_ACTIONS,
  createActionsProxy,
  getFunctionName,
  isPromise,
} from './utils'

export function action<T extends OperatorContextFunction<any, any>>(
  operation: T
): T {
  return createMutationOperator(
    'action',
    getFunctionName(operation),
    (err, context, value, next) => {
      if (err) next(err, value)
      else {
        const result = operation(context, value) as any

        if (isPromise(result)) {
          next(null, result.then((resolvedValue) => resolvedValue))
        } else {
          next(null, result)
        }
      }
    }
  )
}

export function operatorStarted(type, arg, context) {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  const name =
    typeof arg === 'function' ? arg.displayName || arg.name : String(arg)

  context.execution.isRunning = true
  context.execution.emit(EventType.OPERATOR_START, {
    ...context.execution,
    name,
    type,
  })
}

export function operatorStopped(
  context,
  value,
  details: {
    error?: Error
    isIntercepted?: boolean
    isSkipped?: boolean
  } = {}
) {
  if (process.env.NODE_ENV === 'production') {
    if (value instanceof Promise) {
      context.execution.emit(EventType.OPERATOR_ASYNC, {
        ...context.execution,
        isAsync: true,
      })
    }
    return
  }

  const evaluatedDetails = {
    error: details.error ? details.error.message : undefined,
    isIntercepted: Boolean(details.isIntercepted),
    isSkipped: Boolean(details.isSkipped),
  }

  if (value instanceof Promise) {
    value
      .then((promiseValue) => {
        context.execution.isRunning = false
        context.execution.emit(EventType.OPERATOR_END, {
          ...context.execution,
          result: promiseValue,
          isAsync: true,
          ...evaluatedDetails,
        })
      })
      .catch(() => {
        // Make sure an error does not cause uncaught
      })
  } else {
    context.execution.isRunning = false
    context.execution.emit(EventType.OPERATOR_END, {
      ...context.execution,
      result: value,
      isAsync: false,
      ...evaluatedDetails,
    })
  }
}

export function createContext(context, value, path?) {
  if (process.env.NODE_ENV === 'production') {
    return {
      ...context,
      value,
    }
  }

  const newExecution = {
    ...context.execution,
    operatorId: context.execution.getNextOperatorId(),
    path: path || context.execution.path,
  }

  const mutationTrees: any[] = []
  return {
    ...context,
    actions: createActionsProxy(
      context.actions[ORIGINAL_ACTIONS] || context.actions,
      (action) => {
        return (value) =>
          action(value, newExecution.isRunning ? newExecution : null)
      }
    ),
    value,
    execution: newExecution,
    effects: context.execution.trackEffects(newExecution),
    flush: context.parentExecution
      ? context.parentExecution.flush
      : (isAsync?: boolean) => {
          return this.proxyStateTree.flush(mutationTrees, isAsync)
        },
    getMutationTree: context.parentExecution
      ? context.parentExecution.getMutationTree
      : () => {
          const mutationTree = this.proxyStateTree.getMutationTree()

          mutationTrees.push(mutationTree)

          if (this.mode.mode === MODE_TEST) {
            mutationTree.onMutation((mutation) => {
              this.addExecutionMutation(mutation)
            })
          }
          return mutationTree
        },
  }
}

export function createNextPath(next) {
  if (process.env.NODE_ENV === 'production') {
    return next
  }

  return (err, context) => {
    const newContext = {
      ...context,
      execution: {
        ...context.execution,
        path: context.execution.path.slice(
          0,
          context.execution.path.length - 1
        ),
      },
    }
    if (err) next(err, newContext)
    else next(null, newContext)
  }
}

export function createOperator<ThisConfig extends IConfiguration>(
  type: string,
  name: string,
  cb: (
    err: Error | null,
    context: IContext<ThisConfig> & { execution: Execution },
    value: any,
    next: (
      err: Error | null,
      value: any,
      options?: {
        path?: { name: string; operator: Function }
        isSkipped?: boolean
      }
    ) => void,
    final: (err: Error | null, value: any) => void
  ) => any
): any {
  const operator = (err, context, next, final) => {
    operatorStarted(type, name, context)
    let nextIsCalled = false
    try {
      cb(
        err,
        {
          state: context.state,
          effects: context.effects,
          actions: context.actions,
          execution: context.execution,
          addFlushListener: context.addFlushListener,
          addMutationListener: context.addMutationListener,
          reaction: context.reaction,
        },
        context.value,
        (err, value, options = {}) => {
          function run(err, value) {
            if (options.path) {
              const newContext = createContext(
                context,
                value,
                context.execution.path &&
                  context.execution.path.concat(options.path.name)
              )
              const nextWithPath = createNextPath(next)
              const operatorToRun = options.path.operator[IS_OPERATOR]
                ? options.path.operator
                : action(options.path.operator as any)
              operatorToRun(err, newContext, (...args) => {
                operatorStopped(context, args[1].value)
                nextWithPath(...args)
              })
            } else {
              operatorStopped(context, err || value, {
                isSkipped: err ? true : options.isSkipped,
              })
              next(err, createContext(context, value))
            }
          }

          if (value && value instanceof Promise) {
            value
              .then((promiseValue) => run(err, promiseValue))
              .catch((promiseError) => run(promiseError, promiseError))
          } else {
            nextIsCalled = true
            run(err, value)
          }
        },
        (err, value) => {
          nextIsCalled = true
          operatorStopped(context, err || value, {
            isSkipped: Boolean(err),
            isIntercepted: !err,
          })
          final(err, createContext(context, value))
        }
      )
    } catch (error) {
      nextIsCalled = true
      operatorStopped(context, context.value, {
        error,
      })
      next(error, createContext(context, context.value))
    }

    if (!nextIsCalled) {
      context.execution.emit(EventType.OPERATOR_ASYNC, {
        ...context.execution,
        isAsync: true,
      })
    }
  }

  operator[IS_OPERATOR] = true

  return operator
}

export function createMutationOperator<ThisConfig extends IConfiguration>(
  type: string,
  name: string,
  cb: (
    err: Error | null,
    context: IContext<ThisConfig> & { execution: Execution },
    value: any,
    next: (
      err: Error | null,
      value: any,
      options?: {
        path?: { name: string; operator: Function }
        isSkipped?: boolean
      }
    ) => void,
    final: (err: Error | null, value: any) => void
  ) => any
): any {
  const operator = (err, context, next, final) => {
    operatorStarted(type, name, context)
    const mutationTree = context.execution.getMutationTree()
    if (!(process.env.NODE_ENV === 'production')) {
      mutationTree.onMutation((mutation) => {
        context.execution.emit(EventType.MUTATIONS, {
          ...context.execution,
          mutations: [mutation],
        })
      })
    }
    let nextIsCalled = false
    try {
      cb(
        err,
        {
          state: mutationTree.state,
          effects: context.effects,
          actions: context.actions,
          execution: context.execution,
          addFlushListener: context.addFlushListener,
          addMutationListener: context.addMutationListener,
          reaction: context.reaction,
        },
        process.env.NODE_ENV === 'production'
          ? context.value
          : context.execution.scopeValue(context.value, mutationTree),
        (err, value, options = {}) => {
          function run(err, value) {
            operatorStopped(context, err || value, {
              isSkipped: err ? true : options.isSkipped,
            })
            mutationTree.dispose()
            next(err, createContext(context, value))
          }

          if (value && value instanceof Promise) {
            value
              .then((promiseValue) => run(err, promiseValue))
              .catch((promiseError) => run(promiseError, promiseError))
          } else {
            nextIsCalled = true
            run(err, value)
          }
        },
        (err, value) => {
          nextIsCalled = true
          operatorStopped(context, err || value, {
            isSkipped: Boolean(err),
            isIntercepted: !err,
          })
          final(err, createContext(context, value))
        }
      )

      if (!(process.env.NODE_ENV === 'production')) {
        let pendingFlush
        mutationTree.onMutation(() => {
          if (pendingFlush) {
            clearTimeout(pendingFlush)
          }
          pendingFlush = setTimeout(() => {
            const flushData = context.execution.flush(true)

            if (flushData.mutations.length) {
              context.execution.send({
                type: 'flush',
                data: {
                  ...context.execution,
                  ...flushData,
                  mutations: flushData.mutations,
                },
              })
            }
          })
        })
      }
    } catch (error) {
      nextIsCalled = true
      operatorStopped(context, context.value, {
        error,
      })
      next(error, createContext(context, context.value))
    }

    if (!nextIsCalled) {
      context.execution.emit(EventType.OPERATOR_ASYNC, {
        ...context.execution,
        isAsync: true,
      })
    }
  }

  operator[IS_OPERATOR] = true

  return operator
}
