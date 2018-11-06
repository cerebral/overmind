export default (ts) =>
  ts
    ? [
        {
          code: `
import { Pipe, pipe, debounce } from 'overmind'
import { performSearch } from './operators'

export const search: Pipe<string, string> = pipe(
  debounce(200),
  performSearch
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe, debounce } from 'overmind'
import { performSearch } from './operators'

export const search = pipe(
  debounce(200),
  performSearch
)
`,
        },
      ]
