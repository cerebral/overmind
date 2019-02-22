export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind.ts',
          code: `
import { createOvermind, IConfig } from 'overmind'
import { namespaced } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = namespaced({
  moduleA,
  moduleB
})

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

const overmind = createOvermind(config)

export default overmind
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { createOvermind } from 'overmind'
import { namespaced } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = namespaced({
  moduleA,
  moduleB
})

const overmind = createOvermind(config)

export default overmind
`,
        },
      ]
