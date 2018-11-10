export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe } from 'overmind'
import { Item } from './state'

export const openItems: Operator<void, Item[]> = pipe(
  getItems,
  setItems
)

export const openItem: Operator<void, Item> = pipe(
  openItems,
  getItem,
  setItem
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe } from 'overmind'

export const openItems = pipe(
  getItems,
  setItems
)

export const openItem = pipe(
  openItems,
  getItem,
  setItem
)
`,
        },
      ]
