import { tsAppIndex } from '../../templates'

function createJsCode(view) {
  return [
    {
      fileName: 'app/effects.js',
      code: `
export { default as http } from 'axios'
    `,
    },
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

const app = new App({
  state,
  actions,
  effects
})

export default app
      `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app/effects.ts',
      code: `
export { default as http } from 'axios'
    `,
    },
    {
      fileName: 'app/index.ts',
      code: tsAppIndex(
        view,
        `
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

const config = {
  state,
  actions,
  effects
}
      `
      ),
    },
  ]
}

export const react = createJsCode('overmind-react')

export const reactTs = createTsCode('overmind-react')

export const vue = createJsCode('overmind-vue')

export const vueTs = createTsCode('overmind-vue')
