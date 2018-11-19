export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/state.ts',
          code: `
import { Derive } from 'overmind'

export type Post {
  id: string
  title: string
  body: string
  datetime: number
}

export type State = {
  posts: { [id: string] : Post }
  postsList: Derive<State, Post[]>
}

export const state: State = {
  posts: {}
  postsList: state => Object.keys(state.posts).map(id => state.posts[id])
}
              `,
        },
      ]
    : [
        {
          fileName: 'app/state.js',
          code: `
export default = {
  posts: {}
  postsList: state => Object.keys(state.posts).map(id => state.posts[id])
}
            `,
        },
      ]
