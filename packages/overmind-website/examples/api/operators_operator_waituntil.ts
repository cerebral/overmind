export default (ts) =>
  ts
    ? [
        {
          fileName: 'actions.ts',
          code: `
import { Operator, pipe, waitUntil } from 'overmind'
import * as o from './operators'

export const search: Operator<string> = pipe(
  waitUntil(state => state.count === 3),
  o.executeSomething()
)
`,
        },
      ]
    : [
        {
          fileName: 'actions.js',
          code: `
import { pipe, waitUntil } from 'overmind'
import * as o from './operators'

export const search = pipe(
  waitUntil(state => state.count === 3),
  o.executeSomething()
)
`,
        },
      ]
