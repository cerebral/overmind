import {
  actionBaseFactory,
  ActionBase,
  NoValueActionBase,
  StopExecution,
} from './ActionBase'
import { ActionChain, Execution } from './ActionChain'

export type Operator<Context, Value, NewValue = Value> = (
  value: Value,
  context: Context
) => NewValue | Promise<NewValue>

export type OperatorFork<Context, Value, Paths, NewValue = Value> = (
  value: Value,
  context: Context,
  paths: Paths
) => NewValue

export interface Operators<Context, InitialValue, Value> {
  do(
    cb: (value: Value, context: Context) => void
  ): InitialValue extends undefined
    ? NoValueAction<Context, InitialValue, Value>
    : Action<Context, InitialValue, Value>
  map<NewValue>(
    cb: (value: Value, context: Context) => NewValue | Promise<NewValue>
  ): InitialValue extends undefined
    ? NoValueAction<Context, InitialValue, NewValue>
    : Action<Context, InitialValue, NewValue>
  try<ResolveValue, RejectValue, NewValue>(
    cb: Operator<Context, Value, NewValue>,
    paths: {
      success: Action<
        Context,
        ReturnType<Operator<Context, Value, NewValue>>,
        ResolveValue
      >
      error: Action<
        Context,
        ReturnType<Operator<Context, Value, NewValue>>,
        RejectValue
      >
    }
  ): InitialValue extends undefined
    ? NoValueAction<Context, InitialValue, ResolveValue | RejectValue>
    : Action<Context, Value, ResolveValue | RejectValue>
  when<TrueValue, FalseValue>(
    cb: (value: Value, context: Context) => boolean,
    paths: {
      true: Action<Context, Value, TrueValue>
      false: Action<Context, Value, FalseValue>
    }
  ): InitialValue extends undefined
    ? NoValueAction<Context, InitialValue, TrueValue | FalseValue>
    : Action<Context, Value, TrueValue | FalseValue>
  filter(
    cb: (value: Value, context: Context) => boolean
  ): InitialValue extends undefined
    ? NoValueAction<Context, InitialValue, Value>
    : Action<Context, InitialValue, Value>
  debounce(
    timer: number
  ): InitialValue extends undefined
    ? NoValueAction<Context, InitialValue, Value>
    : Action<Context, InitialValue, Value>
}

export interface Action<Context, InitialValue, Value = InitialValue>
  extends Operators<Context, InitialValue, Value>,
    ActionBase<Context, InitialValue, Value> {}

export interface NoValueAction<Context, InitialValue, Value = InitialValue>
  extends Operators<Context, InitialValue, Value>,
    NoValueActionBase<Context, InitialValue, Value> {}

export function actionFactory<Context, InitialValue, Value = InitialValue>(
  actionChain: ActionChain<Context>,
  initialActionId?: number,
  runOperators?: (
    value: any,
    execution: Execution,
    path: string[]
  ) => any | Promise<any>
): InitialValue extends undefined
  ? NoValueAction<Context, InitialValue, Value>
  : Action<Context, InitialValue, Value> {
  return Object.assign(
    actionBaseFactory<Context, InitialValue, Value>(
      actionChain,
      initialActionId,
      runOperators
    ) as any,
    {
      do(cb: (value: Value, context: Context) => void) {
        const operator = (value, context) => {
          cb(value, context)
          return value
        }

        const [
          chain,
          initialActionId,
          runOperators,
        ] = this.createOperatorResult('each', cb.name, operator)

        return actionFactory<Context, InitialValue, Value>(
          chain,
          initialActionId,
          runOperators
        )
      },
      map<NewValue>(
        cb: (value: Value, context: Context) => NewValue | Promise<NewValue>
      ) {
        const [
          chain,
          initialActionId,
          runOperators,
        ] = this.createOperatorResult('map', cb.name, cb)

        return actionFactory<Context, InitialValue, NewValue>(
          chain,
          initialActionId,
          runOperators
        )
      },
      try<ResolveValue, RejectValue, NewValue>(
        cb: Operator<Context, Value, NewValue>,
        paths: {
          success: Action<
            Context,
            ReturnType<Operator<Context, Value, NewValue>>,
            ResolveValue
          >
          error: Action<
            Context,
            ReturnType<Operator<Context, Value, NewValue>>,
            RejectValue
          >
        }
      ) {
        const operator = (value, context) => {
          return (cb(value, context) as any)
            .then((promiseValue) => {
              return (paths.success as any).run(
                promiseValue,
                context.execution,
                context.path.concat('success')
              )
            })
            .catch((error) => {
              return (paths.error as any).run(
                error,
                context.execution,
                context.path.concat('error')
              )
            })
        }
        const [
          chain,
          initialActionId,
          runOperators,
        ] = this.createOperatorResult('try', cb.name, operator)

        return actionFactory<Context, Value, ResolveValue | RejectValue>(
          chain,
          initialActionId,
          runOperators
        )
      },
      when<TrueValue, FalseValue>(
        cb: (value: Value, context: Context) => boolean,
        paths: {
          true: Action<Context, Value, TrueValue>
          false: Action<Context, Value, FalseValue>
        }
      ) {
        const operator = (value, context) => {
          const isTrue = cb(value, context)
          const path = isTrue ? paths.true : (paths.false as any)

          return path.run(
            value,
            context.execution,
            context.path.concat(isTrue ? 'true' : 'false')
          )
        }
        const [
          chain,
          initialActionId,
          runOperators,
        ] = this.createOperatorResult('when', cb.name, operator)

        return actionFactory<Context, Value, TrueValue | FalseValue>(
          chain,
          initialActionId,
          runOperators
        )
      },
      filter(cb: (value: Value, context: Context) => boolean) {
        const operator = (value, context) => {
          const result = cb(value, context)

          if (result === true) {
            return value
          }

          return new StopExecution()
        }
        const [
          chain,
          initialActionId,
          runOperators,
        ] = this.createOperatorResult('filter', cb.name, operator)

        return actionFactory<Context, InitialValue, Value>(
          chain,
          initialActionId,
          runOperators
        )
      },
      debounce(timer: number) {
        let currentTimeout = null

        const operator = (value) => {
          return new Promise((resolve) => {
            if (currentTimeout) {
              currentTimeout()
            }
            const timeoutId = setTimeout(() => {
              resolve(value)
              currentTimeout = null
            }, timer)
            currentTimeout = () => {
              clearTimeout(timeoutId)
              resolve(new StopExecution())
            }
          })
        }
        const [
          chain,
          initialActionId,
          runOperators,
        ] = this.createOperatorResult('debounce', '', operator)

        return actionFactory<Context, InitialValue, Value>(
          chain,
          initialActionId,
          runOperators
        )
      },
    }
  )
}
