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
  postsList: state =>
    Object.keys(state.posts)
      .map(id => state.posts[id])
      .sort((postA, postB) => {
        if (postA.datetime > postB.datetime) {
          return 1
        } else if (postA.datetime < postB.datetime) {
          return -1
        }

        return 0
      })
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
  postsList: state =>
    Object.keys(state.posts)
      .map(id => state.posts[id])
      .sort((postA, postB) => {
        if (postA.datetime > postB.datetime) {
          return 1
        } else if (postA.datetime < postB.datetime) {
          return -1
        }

        return 0
      })
}
            `,
        },
      ]
