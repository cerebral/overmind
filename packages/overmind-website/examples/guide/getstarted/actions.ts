export const js = [
  {
    fileName: 'main/actions.js',
    code: `
import * as mutations from './mutations'
import * as operations from './operations'

export const loadPosts = action =>
  action()
    .mutation(mutations.setLoadingPosts)
    .map(operations.getPosts)
    .mutation(mutations.setPosts)
    .mutation(mutations.unsetLoadingPosts)
    `,
  },
  {
    fileName: 'main/index.js',
    code: `
import state from './state'
import * as actions from './actions'

export { state, actions }
    `,
  },
]

export const ts = [
  {
    fileName: 'main/actions.js',
    code: `
import { Action } from '../app'
import * as mutations from './mutations'
import * as operations from './operations'

export const loadPosts: Action = action =>
  action()
    .mutation(mutations.setLoadingPosts)
    .map(operations.getPosts)
    .mutation(mutations.setPosts)
    .mutation(mutations.unsetLoadingPosts)
    `,
  },
  {
    fileName: 'main/index.js',
    code: `
import state from './state'
import * as actions from './actions'

export { state, actions }
    `,
  },
]
