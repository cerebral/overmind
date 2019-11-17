export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { graphql } from 'overmind-graphql'
import * as queries from './queries'
import * as mutations from './mutations'
import { state } from './state'

export const config = graphql({
  state
}, {
  endpoint: 'http://some-endpoint.dev',
  headers: (state) => ({
    authorization: \`Bearer \${state.auth.token}\`
  }),
  queries,
  mutations
})
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { graphql } from 'overmind-graphql'
import * as queries from './queries'
import * as mutations from './mutations'
import { state } from './state'

export const config = graphql({
  state
}, {
  endpoint: 'http://some-endpoint.dev',
  headers: (state) => ({
    authorization: \`Bearer \${state.auth.token}\`
  }),
  queries,
  mutations
})
`,
        },
      ]
