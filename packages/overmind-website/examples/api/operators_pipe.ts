export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe, debounce } from 'overmind'
import { QueryResult } from './state'
import * as o from './operators'

export const search: Operator<string> = pipe(
  o.setQuery(),
  o.filterValidQuery(),
  debounce(200),
  o.queryResult()
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe, debounce } from 'overmind'
import * as o from './operators'

export const search = pipe(
  o.setQuery(),
  o.filterValidQuery(),
  debounce(200),
  o.queryResult()
)
`,
        },
      ]
