import * as EventEmitter from 'eventemitter3'

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'

export interface ActionChain<Context> extends EventEmitter {
  getOptions(): ActionChainOptions
  getContext(
    execution: Execution,
    path: string[]
  ): Context & {
    execution: Execution
    path: string[]
  }
}

export type ActionChainOptions = {
  actionWrapper?: any
  providerExceptions?: string[]
}

export type Execution = {
  operatorId: number
  actionId: number
  executionId: number
}

export function actionChainFactory<Context>(
  context: Context,
  options: ActionChainOptions = {}
): ActionChain<Context> {
  options.providerExceptions = options.providerExceptions || []

  return Object.assign(new EventEmitter(), {
    getOptions() {
      return options
    },
    getContext(execution: Execution, path: string[]) {
      const providers = Object.keys(context).reduce((currentContext, key) => {
        if (IS_DEVELOPMENT && options.providerExceptions.indexOf(key) === -1) {
          currentContext[key] = Object.keys(context[key]).reduce(
            (currentProvider, method) => {
              currentProvider[method] = (...args) => {
                const result = context[key][method](...args)
                if (result instanceof Promise) {
                  result.then((promisedResult) => {
                    this.emit('provider', {
                      ...execution,
                      name: key,
                      method,
                      result: promisedResult,
                    })
                  })
                } else {
                  this.emit('provider', {
                    ...execution,
                    name: key,
                    method,
                    result,
                  })
                }
                return result
              }

              return currentProvider
            },
            {}
          )
        } else {
          currentContext[key] = context[key]
        }

        return currentContext
      }, {})

      return Object.assign({}, providers, {
        execution,
        path,
      }) as Context & {
        execution: Execution
        path: string[]
      }
    },
  })
}
