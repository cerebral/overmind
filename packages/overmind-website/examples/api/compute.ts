export const js = [
  {
    fileName: 'app/computed.js',
    code: `
export const filteredItems = filterNameBy => state =>
state.items.filter(item => item.name === filterNameBy)
      `,
  },
  {
    fileName: 'app/state.js',
    code: `
import { compute } from 'overmind'
import * as computed from './computed'

export const items = []

export const filteredItems = compute(computed.filteredItems, { limit: 10 })
    `,
  },
]

export const ts = [
  {
    fileName: 'app/computed.ts',
    code: `
import { Compute } from 'overmind'
import { Item } from './state'

export const filteredItems: Compute<string, Item[]> = filterNameBy => state =>
state.items.filter(item => item.name === filterNameBy)
      `,
  },
  {
    fileName: 'app/state.ts',
    code: `
import { compute } from 'overmind'
import * as computed from './computed'

export type Item = {
name: string
}

export const items: Item[] = []

export const filteredItems: (input: string) => Item[] =
compute(computed.filteredItems, { limit: 10 })
    `,
  },
]
