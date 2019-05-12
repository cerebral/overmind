export default (ts) =>
  ts
    ? [
        {
          fileName: 'actions.ts',
          code: `
import { Operator, pipe, debounce } from 'overmind'
import * as o from './operators'

export const search: Operator<string> = pipe(
  debounce(200),
  o.performSearch()
)
`,
        },
      ]
    : [
        {
          fileName: 'actions.js',
          code: `
import { pipe, debounce } from 'overmind'
import * as o from './operators'

export const search = pipe(
  debounce(200),
  o.performSearch()
)
`,
        },
      ]
