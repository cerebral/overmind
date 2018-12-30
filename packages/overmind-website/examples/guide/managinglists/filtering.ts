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
  showCount: number
  postsList: Derive<State, Post[]>
}

export const state: State = {
  posts: {},
  showCount: 10,
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
      .slice(0, state.showCount)
}
              `,
        },
      ]
    : [
        {
          fileName: 'overmind/state.js',
          code: `
export default = {
  posts: {},
  showCount: 10,
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
      .slice(0, state.showCount)
}
            `,
        },
      ]
