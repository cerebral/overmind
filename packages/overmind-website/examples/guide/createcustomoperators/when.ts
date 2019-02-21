export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, Context, Config, createOperator } from 'overmind'

export function when<
  Input,
  OutputTrue,
  OutputFalse
>(
  operation: (context: Context, value: Input) => boolean,
  paths: {
    true: Operator<Input, OutputTrue>
    false: Operator<Input, OutputFalse>
  }
): Operator<Input, OutputTrue | OutputFalse> {
  return createOperator<Config>(
    'when',
    operation.name,
    (err, context, value, next) => {
      if (err) next(err, value)
      else if (operation(context, value))
        next(null, value, {
          name: 'true',
          operator: paths.true,
        })
      else
        next(null, value, {
          name: 'false',
          operator: paths.false,
        })
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

export function when(operation, paths) {
  return createOperator(
    'when',
    operation.name,
    (err, context, value, next) => {
      if (err) next(err, value)
      else if (operation(context, value))
        next(null, value, {
          name: 'true',
          operator: paths.true,
        })
      else
        next(null, value, {
          name: 'false',
          operator: paths.false,
        })
    }
  )
}
`,
        },
      ]
