export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app.ts',
          code: `
import Overmind, { TApp, modules } from 'overmind'
import createConnect, { TConnect } from 'overmind-${view}'
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

const app = new App(config)

export type Connect = TConnect<typeof app>

export default app
`,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import App, { modules } from 'overmind'
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

const app = new App(config)

export default app
`,
        },
      ]
