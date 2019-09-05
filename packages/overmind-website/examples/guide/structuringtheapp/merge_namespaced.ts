export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { IConfig } from 'overmind'
import { merge, namespaced } from 'overmind/config'
import { state } from './state'
import * as posts from './posts'
import * as admin from './admin'

export const config = merge(
  {
    state
  },
  namespaced({
    posts,
    admin
  })
)

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { merge, namespaced } from 'overmind/config'
import { state } from './state'
import * as posts from './posts'
import * as admin from './admin'

export const config = merge(
  {
    state
  },
  namespaced({
    posts,
    admin
  })
)
`,
        },
      ]
