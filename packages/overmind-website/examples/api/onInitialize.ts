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

export const react = js('overmind-react')

export const reactTs = ts('overmind-react')

export const vue = js('overmind-vue')

export const vueTs = ts('overmind-vue')

export const angularTs = ts('overmind-angular')
