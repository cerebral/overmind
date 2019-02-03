import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
          code: `
export type Post = {
  id: number
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
          fileName: 'overmind/index.ts',
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
          fileName: 'overmind/index.js',
          code: `
import { Overmind } from 'overmind'
import { createConnect } from 'overmind-${view}'

export const overmind = new Overmind({
  state: {
    isLoadingPosts: false
  }
})

export const connect = createConnect(overmind)
    `,
        },
      ]
