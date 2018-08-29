import { tsAppIndex } from '../templates'

function createJsCode(view) {
  return [
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'
import * as state from './state'
import * as effects from './effects'
import * as actions from './actions'

const app = new App({
  state,
  effects,
  actions
}, {
  devtools: 'localhost:1234'
})

export default app
  `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app/index.ts',
      code: tsAppIndex(
        view,
        `
import * as state from './state'
import * as effects from './effects'
import * as actions from './actions'

const config = {
  state,
  effects,
  actions
}
`
      ),
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
