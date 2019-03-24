export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe } from 'overmind'

export const loadSomeData: Operator = pipe(...)
export const loadSomeMoreData: Operator = pipe(...)

export const loadAllData: Operator = parallel(
  loadSomeData,
  loadSomeMoreData
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe } from 'overmind'

export const loadSomeData = pipe(...)
export const loadSomeMoreData = pipe(...)

export const loadAllData = parallel(
  loadSomeData,
  loadSomeMoreData
)
`,
        },
      ]
