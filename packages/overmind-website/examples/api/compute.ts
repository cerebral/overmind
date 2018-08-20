function createJsCode(view) {
  return [
    {
      fileName: 'computed.js',
      code: `
export const filteredItems = filterNameBy => state =>
  state.items.filter(item => item.name === filterNameBy)
        `,
    },
    {
      fileName: 'state.js',
      code: `
import { compute } from '${view}'
import * as computed from './computed'

export default {
  items: [],
  filteredItems: compute(computed.filteredItems, { limit: 10 })
}
      `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'computed.ts',
      code: `
export const filteredItems: Compute<string> = filterNameBy => state =>
  state.items.filter(item => item.name === filterNameBy)
        `,
    },
    {
      fileName: 'state.ts',
      code: `
import { compute } from '${view}'
import * as computed from './computed'

type Item = {
  name: string
}

type State = {
  items: Item[]
  filteredItems: (filterNameBy: string) => Item[]
}

const state: State = {
  items: [],
  filteredItems: compute(computed.filteredItems, { limit: 10 })
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
