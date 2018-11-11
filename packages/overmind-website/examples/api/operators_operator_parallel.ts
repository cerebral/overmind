export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe, mutate } from 'overmind'
import { Item } from './state'

export const loadSomeData: Operator<void, void> = pipe(...)
export const loadSomeMoreData: Operator<void, void> = pipe(...)
export const manageAllData = mutate(...)

export const openItem: Operator<void, void> = pipe(
  parallel([
    loadSomeData,
    loadSomeMoreData
  ]),
  manageAllData
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe, mutate } from 'overmind'

export const loadSomeData = pipe(...)
export const loadSomeMoreData = pipe(...)
export const manageAllData = mutate(...)

export const openItem = pipe(
  parallel([
    loadSomeData,
    loadSomeMoreData
  ]),
  manageAllData
)
`,
        },
      ]
