import { ActionChain, Execution } from './ActionChain'
;(actionBaseFactory as any).nextActionId = 0

export class StopExecution {
  toJSON() {
    return '[EXECUTION_STOPPED]'
  }
}

export interface ActionBase<Context, InitialValue, Value = InitialValue> {
  (value: InitialValue): Value
  createOperatorResult(
    type: string,
    name: string,
    cb: any
  ): [ActionChain<Context>, number, any]
}

export interface NoValueActionBase<Context, InitialValue, Value = InitialValue>
  extends ActionBase<Context, InitialValue, Value> {
  (): Value
}

export function actionBaseFactory<Context, InitialValue, Value = InitialValue>(
  actionChain: ActionChain<Context>,
  initialActionId: number = (actionBaseFactory as any).nextActionId++,
  runOperators?: (
    value: any,
    execution: Execution,
    path: string[]
  ) => any | Promise<any>
): InitialValue extends undefined
  ? NoValueActionBase<Context, InitialValue, Value>
  : ActionBase<Context, InitialValue, Value> {
  let currentExecutionId = 0
  return Object.assign(
    function(value) {
      const initialOperator = typeof arguments[1] === 'undefined'
      const execution = initialOperator
        ? {
            operatorId: -1,
            actionId: initialActionId,
            executionId: currentExecutionId++,
          }
        : arguments[1]

      const path = typeof arguments[2] === 'undefined' ? [] : arguments[2]
      if (initialOperator) {
        actionChain.emit('action:start', {
          actionId: execution.actionId,
          executionId: execution.executionId,
        })
      }
      const returnValue = runOperators
        ? runOperators(value, execution, path)
        : value

      if (initialOperator && returnValue instanceof Promise) {
        returnValue.then(() => {
          actionChain.emit('action:end', {
            actionId: execution.actionId,
            executionId: execution.executionId,
          })
        })
      } else if (initialOperator) {
        actionChain.emit('action:end', {
          actionId: execution.actionId,
          executionId: execution.executionId,
        })
      }

      return returnValue
    } as any,
    {
      createOperatorResult(
        type: string,
        name: string,
        cb: any
      ): [ActionChain<Context>, number, any] {
        return [
          actionChain,
          initialActionId,
          (props, execution, path) => {
            const prevResult = runOperators
              ? runOperators(props, execution, path)
              : props

            function produceResult(currentValue) {
              if (currentValue instanceof StopExecution) {
                return currentValue
              }

              execution.operatorId++
              const context = actionChain.getContext(execution, path)

              actionChain.emit('operator:start', {
                type,
                name,
                path,
                ...context.execution,
              })
              const result = actionChain.getOptions().actionWrapper
                ? actionChain
                    .getOptions()
                    .actionWrapper(currentValue, context, cb)
                : cb(currentValue, context)

              if (result instanceof Promise) {
                return result.then((promiseResult) => {
                  actionChain.emit('operator:end', {
                    type,
                    name,
                    path,
                    ...context.execution,
                    isAsync: true,
                    result: promiseResult,
                  })
                  return promiseResult
                })
              }

              actionChain.emit('operator:end', {
                type,
                name,
                path,
                ...context.execution,
                isAsync: false,
                result: result,
              })

              return result
            }

            if (prevResult instanceof Promise) {
              return prevResult.then(produceResult)
            }

            return produceResult(prevResult)
          },
        ]
      },
    }
  )
}
