export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind.ts',
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

const overmind = new Overmind(config)

export default overmind
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { Overmind} from 'overmind'
import { namespaced } from 'overmind/config'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = namespaced({
  moduleA,
  moduleB
})

const overmind = new Overmind(config)

export default overmind
`,
        },
      ]
