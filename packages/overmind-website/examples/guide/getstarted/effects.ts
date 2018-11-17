import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/effects.ts',
          code: `
import { Post } from './state'
    
export const jsonPlaceholder = {
  getPosts(): Promise<Post[]> {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
  }
}
      `,
        },
        {
          fileName: 'app/index.js',
          code: tsAppIndex(
            view,
            `
import state from './state'
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
  },
  effects: {
    getPosts() {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
    }
  }
})

export const connect = createConnect(app)
    `,
        },
      ]
