export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app.ts',
          code: `
import { Overmind, TApp } from 'overmind'
import { modules } from 'overmind/modules'
import { TConnect, createConnect } from 'overmind-${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = modules({
  state: {
    title: 'My app'
  },
  modules: {
    moduleA,
    moduleB
  }
})

declare module 'overmind' {
  interface App extends TApp<typeof config> {}
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
import { modules } from 'overmind/modules'
import createConnect from 'overmind-${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = modules({
  state: {
    title: 'My app'
  },
  modules: {
    moduleA,
    moduleB
  }
})

const app = new Overmind(config)

export default app
`,
        },
      ]
