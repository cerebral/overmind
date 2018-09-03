import { tsAppIndex } from '../../templates'

function createJsCode(view) {
  return [
    {
      fileName: 'app/state.js',
      code: `
export let isLoadingPosts = false
      `,
    },
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'
import * as state from './state'

const app = new App({
  state
})

export default app
      `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app/state.ts',
      code: `
export let isLoadingPosts: boolean = false
      `,
    },
    {
      fileName: 'app/index.ts',
      code: tsAppIndex(
        view,
        `
import * as state from './state'

const config = {
  state,
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
