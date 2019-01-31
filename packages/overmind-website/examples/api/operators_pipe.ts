export default (ts) =>
  ts
    ? [
        {
          code: `
import { Action, Operator, pipe, debounce } from 'overmind'
import { QueryResult } from './state'
import {
  setQuery,
  filterValidQuery,
  queryResult
} from './operators'

export const search: Action<string> = pipe(
  setQuery,
  filterValidQuery,
  debounce(200),
  queryResult
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe, debounce } from 'overmind'
import {
  setQuery,
  filterValidQuery,
  queryResult
} from './operators'

export const search = pipe(
  setQuery,
  filterValidQuery,
  debounce(200),
  queryResult
)
`,
        },
      ]
