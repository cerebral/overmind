import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import { Post } from './state'
    
export const jsonPlaceholder = {
  async getPosts(): Promise<Post[]> {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
  }
}
      `,
        },
        {
          fileName: 'overmind/index.js',
          code: tsAppIndex(
            view,
            `
import state from './state'
import * as effects from './effects'

const config = {
  state,
  effects
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
    getPosts() {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
    }
  }
})

export const connect = createConnect(overmind)
    `,
        },
      ]
