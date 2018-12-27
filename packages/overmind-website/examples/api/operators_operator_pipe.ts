export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe } from 'overmind'
import { Item } from './state'

export const openItems: Operator<any, Item[]> = pipe(
  getItems,
  forEach(getAuthor)
)

export const openItem: Operator<string, Item> = pipe(
  openItems,
  getItem
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
  forEach(getAuthor)
)

export const openItem = pipe(
  openItems,
  getItem
)
`,
        },
      ]
