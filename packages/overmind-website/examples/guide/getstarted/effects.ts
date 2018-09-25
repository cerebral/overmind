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
    : [
        {
          fileName: 'app/effects.js',
          code: `
export const jsonPlaceholder = {
  getPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
  }
}
      `,
        },
        {
          fileName: 'app/index.js',
          code: `
import App from 'overmind'
import createConnect from 'overmind-${view}'
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

const app = new App({
  state,
  actions,
  effects
})

export const connect = createConnect(app)

export default app
    `,
        },
      ]
