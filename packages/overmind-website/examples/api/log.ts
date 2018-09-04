export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/mutations.ts',
          code: `
import { Mutate, log } from 'overmind'
import { Item } from './state'

export const setItems: Mutate<Item[]> = (state, items) => {
  log(state.items)
  state.items = items
}
    `,
        },
      ]
    : [
        {
          fileName: 'app/mutations.js',
          code: `
import { log } from 'overmind'

export const setItems = (state, items) => {
  log(state.items)
  state.items = items
}
    `,
        },
      ]
