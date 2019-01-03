export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe, action } from 'overmind'
import { Item } from './state'

export const loadSomeData: Operator = pipe(...)
export const loadSomeMoreData: Operator = pipe(...)
export const manageAllData = action(...)

export const openItem: Operator = pipe(
  parallel(
    loadSomeData,
    loadSomeMoreData
  ),
  manageAllData
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe, action } from 'overmind'

export const loadSomeData = pipe(...)
export const loadSomeMoreData = pipe(...)
export const manageAllData = action(...)

export const openItem = pipe(
  parallel(
    loadSomeData,
    loadSomeMoreData
  ),
  manageAllData
)
`,
        },
      ]
