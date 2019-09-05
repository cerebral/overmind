export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind.ts',
          code: `
import { createOvermind, IConfig } from 'overmind'
import { merge, namespaced } from 'overmind/config'
import { state } from './state'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = merge(
  {
    state
  },
  namespaced({
    moduleA,
    moduleB
  })
)

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export default createOvermind(config)
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { createOvermind } from 'overmind'
import { merge, namespaced } from 'overmind/config'
import { state } from './state'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = merge(
  {
    state
  },
  namespaced({
    moduleA,
    moduleB
  })
)

export default createOvermind(config)
`,
        },
      ]
