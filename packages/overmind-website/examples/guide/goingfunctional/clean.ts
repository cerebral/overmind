export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe, debounce } from 'overmind'
import * as o from './operators'

export const search: Operator<string> = pipe(
  o.setQuery(),
  o.lengthGreaterThan(2),
  debounce(200),
  o.getSearchResult()
)
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe, debounce } from 'overmind'
import * as o from './operators'

export const search = pipe(
  o.setQuery(),
  o.lengthGreaterThan(2),
  debounce(200),
  o.getSearchResult()
)
  `,
        },
      ]
