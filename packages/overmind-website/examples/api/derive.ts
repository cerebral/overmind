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
      fileName: 'state.js',
      code: `
import { derive } from '${view}'
import * as derived from './derived'

export default {
  items: [],
  completedItems: derive(derived.completedItems)
}
      `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'derived.ts',
      code: `
export const completedItems: Derive = state =>
  state.items.filter(item => item.completed)

        `,
    },
    {
      fileName: 'state.ts',
      code: `
import { derive } from '${view}'
import * as derived from './derived'

type Item = {
  title: string
  completed: boolean
}

type State = {
  items: Item[]
  completedItems: Item[]
}

const state: State = {
  items: [],
  completedItems: derive(derived.completedItems)
}

export default state
      `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
