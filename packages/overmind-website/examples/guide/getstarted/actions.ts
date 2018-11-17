import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/actions.js',
          code: `
import { Action } from 'overmind'

export const loadPosts: Action = async ({ state, jsonPlaceholder }) => {
  state.isLoadingPosts = true
  state.posts = await jsonPlaceholder.getPosts()
  state.isLoadingPosts = false
}
    `,
        },
        {
          fileName: 'app/index.ts',
          code: tsAppIndex(
            view,
            `
import { state } from './state'
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
          fileName: 'app/index.js',
          code: `
import { Overmind } from 'overmind'
import { createConnect } from 'overmind-${view}'

export const app = new Overmind({
  state: {
    isLoadingPosts: false,
    posts: []
  },
  actions: {
    loadPosts: async ({ state, jsonPlaceholder }) => {
      state.isLoadingPosts = true
      state.posts = await jsonPlaceholder.getPosts()
      state.isLoadingPosts = false
    }
  }
})

export const connect = createConnect(app)
    `,
        },
      ]
