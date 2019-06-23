export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
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
    Object.values(state.posts)
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
          fileName: 'overmind/state.js',
          code: `
export default = {
  posts: {}
  postsList: state =>
    Object.values(state.posts)
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
