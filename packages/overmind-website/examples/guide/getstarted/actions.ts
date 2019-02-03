import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.js',
          code: `
import { Action } from 'overmind'

export const getPosts: Action = async ({ state, effects }) => {
  state.isLoadingPosts = true
  state.posts = await effects.jsonPlaceholder.getPosts()
  state.isLoadingPosts = false
}
    `,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsAppIndex(
            view,
            `
import { state } from './state'
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
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { Overmind } from 'overmind'
import { createConnect } from 'overmind-${view}'

export const overmind = new Overmind({
  state: {
    isLoadingPosts: false,
    posts: []
  },
  effects: {
    jsonPlaceholder: {
      async getPosts() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        
        return response.json()
      }
    }
  },
  actions: {
    async getPosts({ state, effects }) => {
      state.isLoadingPosts = true
      state.posts = await effects.jsonPlaceholder.getPosts()
      state.isLoadingPosts = false
    }
  }
})

export const connect = createConnect(overmind)
    `,
        },
      ]
