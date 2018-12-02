export default (ts) =>
  ts
    ? [
        {
          fileName: 'app.ts',
          code: `
import { Overmind, TConfig } from 'overmind'
import { namespaced } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = namespaced({
  moduleA,
  moduleB
})

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

const app = new Overmind(config)

export default app
`,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import { Overmind} from 'overmind'
import { namespaced } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = namespaced({
  moduleA,
  moduleB
})

const app = new Overmind(config)

export default app
`,
        },
      ]
