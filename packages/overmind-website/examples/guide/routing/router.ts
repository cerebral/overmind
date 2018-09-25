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

const withParams = <T>(action: (payload: T) => any) => ({ params }) => action(params)

page('/', withParams(app.actions.showHomePage))
page('/users', withParams(app.actions.showUsersPage))
page('/users/:id', withParams<{ id: string }>(app.actions.showUserModal))

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
import App from 'overmind'
import createConnect from 'overmind-${view}'
import page from 'page'
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

const app = new App({
  state,
  actions,
  effects
})

const withParams = (action) => ({ params }) => action(params)

page('/', withParams(app.actions.showHomePage))
page('/users', withParams(app.actions.showUsersPage))
page('/users/:id', withParams(app.actions.showUserModal))

page.start()

export const connect = createConnect(app)

export default app
    `,
        },
      ]
