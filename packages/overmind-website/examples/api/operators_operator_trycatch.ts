export default (ts) =>
  ts
    ? [
        {
          fileName: 'operators.ts',
          code: `
import { Operator, pipe, tryCatch } from 'overmind'
import * as o from './operators'

export const doSomething: Operator<string> = tryCatch({
  try: o.somethingThatMightError(),
  catch: o.somethingToHandleTheError()
})
`,
        },
      ]
    : [
        {
          fileName: 'operators.js',
          code: `
import { pipe, tryCatch } from 'overmind'
import * as o from './operators'

export const doSomething = tryCatch({
  try: o.somethingThatMightError(),
  catch: o.somethingToHandleTheError()
})
`,
        },
      ]
