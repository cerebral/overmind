export default (ts) =>
  ts
    ? [
        {
          fileName: 'actions.ts',
          code: `
import { Operator, pipe, wait } from 'overmind'
import * as o from './operators'

export const search: Operator<string> = pipe(
  wait(2000),
  o.executeSomething()
)
`,
        },
      ]
    : [
        {
          fileName: 'actions.js',
          code: `
import { pipe, wait } from 'overmind'
import * as o from './operators'

export const search = pipe(
  wait(2000),
  o.executeSomething()
)
`,
        },
      ]
