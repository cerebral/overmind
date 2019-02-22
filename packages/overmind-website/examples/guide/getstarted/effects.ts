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
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    
    return response.json()
  }
}
      `,
        },
        {
          fileName: 'overmind/index.js',
          code: tsAppIndex(
            view,
            `
import { state } from './state'
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
import { createOvermind } from 'overmind'
import { createConnect } from 'overmind-${view}'

export const overmind = createOvermind({
  state: {
    isLoadingPosts: false,
    posts: []
  },
  effects: {
    async getPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      
      return response.json()
    }
  }
})

export const connect = createConnect(overmind)
    `,
        },
      ]
