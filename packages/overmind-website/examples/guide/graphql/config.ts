export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { state } from './state'

export const config = {
  state
}
`,
        },
        {
          fileName: 'overmind/state.ts',
          code: `
// We will talk about this one soon :)
import { Post } from './graphql-types'

type State = {
  posts: Post[]
}

export const state: State = {
  posts: []
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { state } from './state'

export const config = {
  state
}
`,
        },
        {
          fileName: 'overmind/state.js',
          code: `
export const state = {
  posts: []
}
`,
        },
      ]
