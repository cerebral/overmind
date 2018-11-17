export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/state.ts',
          code: `
import { Derive } from 'overmind'

export type Item = {
  title: string
  completed: boolean
}

export type State = {
  items: Item[]
  completedItems: Derive<State, Item[]>
}

export const state: State = {
  items: [],
  completedItems: (state, rootState) =>
    state.items.filter(item => item.completed)
}
    `,
        },
      ]
    : [
        {
          fileName: 'app/state.js',
          code: `
import * as derived from './derived'

export default {
  items: [],
  completedItems: (state, rootState) =>
    state.items.filter(item => item.completed)
}
    `,
        },
      ]
