export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind.ts',
          code: `
import { Overmind, IConfig } from 'overmind'
import { merge } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = merge(moduleA, moduleB)

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export default new Overmind(config)
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { Overmind} from 'overmind'
import { merge } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = merge(moduleA, moduleB)

export default new Overmind(config)
`,
        },
      ]
