export default (ts) =>
  ts
    ? [
        {
          fileName: 'actions.ts',
          code: `
import { Operator, pipe, forEach } from 'overmind'
import { Post } from './state'
import * as o from './operators'

export const openPosts: Operator<string, Post[]> = pipe(
  o.getPosts(),
  forEach(o.getAuthor())
)
`,
        },
      ]
    : [
        {
          fileName: 'actions.js',
          code: `
import { pipe, forEach } from 'overmind'
import * as o from './operators'

export const openPosts = pipe(
  o.getPosts(),
  forEach(o.getAuthor())
)
`,
        },
      ]
