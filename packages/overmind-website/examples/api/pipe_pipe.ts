export default (ts) =>
  ts
    ? [
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
