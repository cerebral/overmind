export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, Context, Config, createOperator } from 'overmind'

export function filter<Input>(
  operation: (context: Context, value: Input) => boolean
): Operator<Input> {
  return createOperator<Config>(
    'filter',
    operation.name,
    (err, context, value, next, final) => {
      if (err) next(err, value)
      else if (operation(context, value)) next(null, value)
      else final(null, value)
    }
  )
}
`,
        },
      ]
    : [
        {
          code: `
import {createOperator } from 'overmind'

export function filter(operation) {
  return createOperator(
    'filter',
    operation.name,
    (err, context, value, next, final) => {
      if (err) next(err, value)
      else if (operation(context, value)) next(null, value)
      else final(null, value)
    }
  )
}
`,
        },
      ]
