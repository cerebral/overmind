function createCode(view) {
  return [
    {
      code: `
import App, { namespaces } from '${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const namespaced = namespaces({
  moduleA,
  moduleB
})

const app = new App(namespaced)
        `,
    },
  ]
}

export const react = createCode('react-overmind')

export const reactTs = createCode('react-overmind')

export const vue = createCode('vue-overmind')

export const vueTs = createCode('vue-overmind')
