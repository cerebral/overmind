function createJsCode(view) {
  return [
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
}

function createTsCode(view) {
  return [
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
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
