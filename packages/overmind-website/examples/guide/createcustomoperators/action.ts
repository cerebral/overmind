export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, Context, Config, createMutationOperator } from 'overmind'

export function action<Input>(
  operation: (context: Context, value: Input) => void
): Operator<Input> {
  return createMutationOperator<Config>(
    'action',
    operation.name,
    (err, context, value, next) => {
      if (err) next(err, value)
      else {
        operation(context, value)
        next(null, value)
      }
    }
  )
}
`,
        },
      ]
    : [
        {
          code: `
import { createMutationOperator } from 'overmind'

export function action(operation) {
  return createMutationOperator(
    'action',
    operation.name,
    (err, context, value, next) => {
      if (err) next(err, value)
      else {
        operation(context, value)
        next(null, value)
      }
    }
  )
}
`,
        },
      ]
