export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe, debounce } from 'overmind'
import { QueryResult } from './state'
import {
  setQuery,
  filterValidQuery,
  getResult,
  catchResultError,
  setResult
} from './operators'

export const search: Operator<string, QueryResult[]> = pipe(
  setQuery,
  filterValidQuery,
  debounce(200),
  getResult,
  catchResultError,
  setResult
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
  getResult,
  catchResultError,
  setResult
} from './operators'

export const search = pipe(
  setQuery,
  filterValidQuery,
  debounce(200),
  getResult,
  catchResultError,
  setResult
)
`,
        },
      ]
