export const js = [
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

export const ts = [
  {
    fileName: 'app/mutations.ts',
    code: `
import { Mutation, log } from 'overmind'
import { Item } from './state'

export const setItems: Mutation<Item[]> = (state, items) => {
  log(state.items)
  state.items = items
}
    `,
  },
]
