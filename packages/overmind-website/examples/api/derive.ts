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

export const items: Item[] = []

export const completedItems: Derive<Item[]> = (state, rootState) =>
  state.items.filter(item => item.completed)
    `,
        },
      ]
    : [
        {
          fileName: 'app/state.js',
          code: `
import * as derived from './derived'

export const items = []

export const completedItems = (state, rootState) =>
  state.items.filter(item => item.completed)
    `,
        },
      ]
