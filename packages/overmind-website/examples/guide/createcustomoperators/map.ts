export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, Context, Config, createOperator } from 'overmind'

export function map<Input, Output>(
  operation: (context: Context, value: Input) => Output
): Operator<Input, Output extends Promise<infer U> ? U : Output> {
  return createOperator<Config>(
    'map',
    operation.name,
    (err, context, value, next) => {
      if (err) next(err, value)
      else next(null, operation(context, value))
    }
  )
}
`,
        },
      ]
    : [
        {
          code: `
import { createOperator } from 'overmind'

export function map(operation) {
  return createOperator<Config>(
    'map',
    operation.name,
    (err, context, value, next) => {
      if (err) next(err, value)
      else next(null, operation(context, value))
    }
  )
}
`,
        },
      ]
