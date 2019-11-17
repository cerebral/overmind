export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { graphql } from 'overmind-graphql'
import * as actions from './actions'
import * as queries from './queries'
import * as mutations from './mutations'
import { state } from './state'

export const config = graphql({
  state,
  actions
}, {
  endpoint: 'http://some-endpoint.dev',
  queries,
  mutations
})
`,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { AsyncAction } from 'overmind'

export const getPosts: AsyncAction = async ({ state, effects }) => {
  const { posts } = await effects.queries.posts()
  
  state.posts = posts
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { graphql } from 'overmind-graphql'
import * as actions from './actions'
import * as queries from './queries'
import * as mutations from './mutations'
import { state } from './state'

export const config = graphql({
  state,
  actions
}, {
  endpoint: 'http://some-endpoint.dev',
  queries,
  mutations
})
`,
        },
        {
          fileName: 'overmind/actions.js',
          code: `
export const getPosts = async ({ state, effects }) => {
  const { posts } = await effects.queries.posts()

  state.posts = posts
}
`,
        },
      ]
