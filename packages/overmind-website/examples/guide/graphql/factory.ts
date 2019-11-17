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
  queries,
  mutations
})
`,
        },
        {
          fileName: 'overmind/queries.ts',
          code: `
import { Query, gql } from 'overmind-graphql'
import { Posts } from './graphql-types'

export const posts: Query<Posts> = gql\`
  query Posts {
    posts {
      id
      title
    }
  }
\`;
`,
        },
        {
          fileName: 'overmind/mutations.ts',
          code: `
import { Query, gql } from 'overmind-graphql'
import { CreatePost, CreatePostVariables } from './graphql-types'

export const createPost: Query<CreatePost, CreatePostVariables> = gql\`
  mutation CreatePost($title: String!) {
    createPost(title: $title) {
      id
    }
  }
\`
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
  queries,
  mutations
})
`,
        },
        {
          fileName: 'overmind/queries.js',
          code: `
import { gql } from 'overmind-graphql'

export const posts = gql\`
  query Posts {
    posts {
      id
      title
    }
  }
\`;
`,
        },
        {
          fileName: 'overmind/mutations.ts',
          code: `
import { gql } from 'overmind-graphql'

export const createPost = gql\`
  mutation CreatePost($title: String!) {
    createPost(title: $title) {
      id
    }
  }
\`
`,
        },
      ]
