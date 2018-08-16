function createJsCode(view) {
  return [
    {
      code: `
import { compute } from '${view}'

compute(
  filterNameBy =>
  state =>
  state.items.filter(item => item.name === filterNameBy),
  {
    limit: 10
  }
)
        `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      code: `
import { compute } from '${view}'
import { State } from '../app'

compute(
  (filterNameBy: string) =>
  (state: State) =>
  state.items.filter(item => item.name === filterNameBy),
  {
    limit: 10
  }
)
        `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
