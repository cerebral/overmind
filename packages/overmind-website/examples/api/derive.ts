export default (ts) =>
  ts
    ? [
        {
          fileName: 'derived.ts',
          code: `
import { Derive } from 'overmind'
import { Item } from './state'

export const completedItems: Derive<Item[]> = state =>
  state.items.filter(item => item.completed)

      `,
        },
        {
          fileName: 'app/state.ts',
          code: `
import { derive } from 'overmind'
import * as derived from './derived'

export type Item = {
title: string
completed: boolean
}

export const items: Item[] = []

export const completedItems: Item[] = derive(derived.completedItems)
    `,
        },
      ]
    : [
        {
          fileName: 'derived.js',
          code: `
export const completedItems = state =>
  state.items.filter(item => item.completed)

      `,
        },
        {
          fileName: 'app/state.js',
          code: `
import { derive } from 'overmind'
import * as derived from './derived'

export const items = []

export const completedItems = derive(derived.completedItems)
    `,
        },
      ]
