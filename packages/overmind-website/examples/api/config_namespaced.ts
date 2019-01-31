export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind.ts',
          code: `
import { Overmind, IConfig } from 'overmind'
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
