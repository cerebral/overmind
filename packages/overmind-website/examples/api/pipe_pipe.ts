export default (ts) =>
  ts
    ? [
        {
          code: `
import { Pipe, pipe } from 'overmind'
import { Item } from './state'

export const openItems: Pipe<void, Item[]> = pipe(
  getItems,
  setItems
)

export const openItem: Pipe<void, Item> = pipe(
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
