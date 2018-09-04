export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import App, { TConnect } from 'overmind-${view}'
import * as page from 'page'
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

const config = {
  state,
  actions,
  effects
}

declare module 'overmind' {
  interface IState extends TState<typeof config> {}
  interface IEffects extends TEffects<typeof config> {}
}

const app = new App(config)

page.start()

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
import page from 'page'
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

const app = new App({
  state,
  actions,
  effects
})

page('/', ({ params }) => app.actions.showHomePage(params))

page.start()

export default app
    `,
        },
      ]
