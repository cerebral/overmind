export default (ts) =>
  ts
    ? [
        {
          code: `
import { Action, Operator, fromOperator, pipe, debounce } from 'overmind'
import { QueryResult } from './state'
import {
  setQuery,
  filterValidQuery,
  queryResult
} from './operators'

export const search: Action<string> = fromOperator(
  pipe(
    setQuery,
    filterValidQuery,
    debounce(200),
    queryResult
  )
)
`,
        },
      ]
    : [
        {
          code: `
import { fromOperator, pipe, debounce } from 'overmind'
import {
  setQuery,
  filterValidQuery,
  queryResult
} from './operators'

export const search = fromOperator(
  pipe(
    setQuery,
    filterValidQuery,
    debounce(200),
    queryResult
  )
)
`,
        },
      ]
