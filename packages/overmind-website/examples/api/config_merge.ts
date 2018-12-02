export default (ts) =>
  ts
    ? [
        {
          fileName: 'app.ts',
          code: `
import { Overmind, TConfig } from 'overmind'
import { merge } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = merge({
  moduleA,
  moduleB
})

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

export default new Overmind(config)
`,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import { Overmind} from 'overmind'
import { merge } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = merge({
  moduleA,
  moduleB
})

export default new Overmind(config)
`,
        },
      ]
