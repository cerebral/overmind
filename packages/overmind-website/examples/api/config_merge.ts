export default (ts, view) =>
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

const app = new Overmind(config)

export type Connect = TConnect<typeof app>

export default app
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

const app = new Overmind(config)

export default app
`,
        },
      ]
