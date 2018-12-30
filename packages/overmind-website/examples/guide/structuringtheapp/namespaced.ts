export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/posts/index.ts',
          code: `
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export {
  state,
  actions,
  effects
}
`,
        },
        {
          fileName: 'overmind/admin/index.ts',
          code: `
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export {
  state,
  actions,
  effects
}
`,
        },
        {
          fileName: 'overmind/index.ts',
          code: `
import { Overmind, TConfig } from 'overmind'
import { namespaced } from 'overmind/config'
import * as posts from './posts'
import * as admin from './admin'

const config = namespaced({
  posts,
  admin
})

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

const overmind = new Overmind(config)
`,
        },
      ]
    : [
        {
          fileName: 'overmind/posts/index.js',
          code: `
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export {
  state,
  actions,
  effects
}
`,
        },
        {
          fileName: 'overmind/admin/index.js',
          code: `
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export {
  state,
  actions,
  effects
}
`,
        },
        {
          fileName: 'overmind/index.js',
          code: `
import { Overmind } from 'overmind'
import { namespaced } from 'overmind/config'
import * as posts from './posts'
import * as admin from './admin'

const config = namespaced({
  posts,
  admin
})

const overmind = new Overmind(config)
`,
        },
      ]
