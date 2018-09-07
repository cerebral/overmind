export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app.ts',
          code: `
import App, { TConnect } from 'overmind-${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = {
  modules: {
    moduleA,
    moduleB
  }
}

declare module 'overmind' {
  interface IState extends TState<typeof config> {}
  interface IEffects extends TEffects<typeof config> {}
}


const app = new App(config, {
  devtools: 'localhost:1234'
})

export type Connect = TConnect<typeof app>

export default app
`,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import App from 'overmind-${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const app = new App({
  modules: {
    moduleA,
    moduleB
  }
}, {
  devtools: 'localhost:1234'
})

export default app
`,
        },
      ]
