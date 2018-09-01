import { tsAppIndex } from '../templates'

function js(view) {
  return [
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'
import * as state from './state'
import * as actions from './actions'

const onInitialize = actions.initialize

const app = new App({
  onInitialize,
  state,
  actions
})

export default app
  `,
    },
  ]
}

function ts(view) {
  return [
    {
      fileName: 'app/index.ts',
      code: tsAppIndex(
        view,
        `
import * as state from './state'
import * as actions from './actions'

const onInitialize: Action = actions.initialize

const config = {
  onInitialize,
  state,
  actions
}
  `
      ),
    },
  ]
}

export const react = js('react-overmind')

export const reactTs = ts('react-overmind')

export const vue = js('vue-overmind')

export const vueTs = ts('vue-overmind')
