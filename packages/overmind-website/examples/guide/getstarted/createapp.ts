import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/state.ts',
          code: `
export type Post = {
  title: string
  body: string
}

export type State = {
  isLoadingPosts: boolean
  posts: Post[]
}

export const state: State = {
  isLoadingPosts: false,
  posts: []
}
    `,
        },
        {
          fileName: 'app/index.ts',
          code: tsAppIndex(
            view,
            `
import { state } from './state'

const config = {
  state,
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
    isLoadingPosts: false
  }
})

export const connect = createConnect(app)
    `,
        },
      ]
