import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/actions.js',
          code: `
import { Action } from 'overmind'
import * as mutations from './mutations'
import * as operations from './operations'

export const loadPosts: Action = action =>
  action
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
    : [
        {
          fileName: 'app/actions.js',
          code: `
import * as mutations from './mutations'
import * as operations from './operations'

export const loadPosts = action =>
  action
    .mutate(mutations.setLoadingPosts)
    .map(operations.getPosts)
    .mutate(mutations.setPosts)
    .mutate(mutations.unsetLoadingPosts)
    `,
        },
        {
          fileName: 'app/index.js',
          code: `
import App from 'overmind-${view}'
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
