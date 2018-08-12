function createJsCode(view) {
  return [
    {
      code: `
import { derive } from '${view}'

derive(
  state => state.items.filter(item => item.completed)
)
        `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      code: `
import { derive } from '${view}'
import { State } from '../app'

derive(
  (state: State) => state.items.filter(item => item.completed)
)
        `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
