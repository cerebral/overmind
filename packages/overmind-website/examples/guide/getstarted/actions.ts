import { tsAppIndex } from '../../templates'

function createJsCode(view) {
  return [
    {
      fileName: 'app/actions.js',
      code: `
import * as mutations from './mutations'
import * as operations from './operations'

export const loadPosts = action =>
  action()
    .mutate(mutations.setLoadingPosts)
    .map(operations.getPosts)
    .mutate(mutations.setPosts)
    .mutate(mutations.unsetLoadingPosts)
      `,
    },
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'
import * as state from './state'
import * as actions from './actions'

const app = new App({
  state,
  actions
})

export default app
      `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app/actions.js',
      code: `
import { Action } from 'overmind'
import * as mutations from './mutations'
import * as operations from './operations'

export const loadPosts: Action = action =>
  action()
    .mutate(mutations.setLoadingPosts)
    .map(operations.getPosts)
    .mutate(mutations.setPosts)
    .mutate(mutations.unsetLoadingPosts)
      `,
    },
    {
      fileName: 'app/index.ts',
      code: tsAppIndex(
        view,
        `
import * as state from './state'
import * as actions from './actions'

const config = {
  state,
  actions
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

export const angularTs = createTsCode('overmind-angular')
