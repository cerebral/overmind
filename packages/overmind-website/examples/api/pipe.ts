export default (ts) =>
  ts
    ? [
        {
          code: `
import { Pipe, pipe, debounce } from 'overmind'
import {
  setQuery,
  filterValidQuery,
  getResult,
  catchResultError,
  setResult
} from './operators'

export const search: Pipe<string> = pipe(
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
