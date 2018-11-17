export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import { Overmind, TApp } from 'overmind'
import { createConnect, TConnect } from 'overmind-${view}'
import * as page from 'page'
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

const config = {
  state,
  actions,
  effects
}

declare module 'overmind' {
  interface App extends TApp<typeof config> {}
}

export const app = new Overmind(config)

const withParams = <T>(action: (payload: T) => any) => ({ params }) => action(params)

page('/', withParams(app.actions.showHomePage))
page('/users', withParams(app.actions.showUsersPage))
page('/users/:id', withParams<{ id: string }>(app.actions.showUserModal))

page.start()

export type Connect = TConnect<typeof app>

export connect = createConnect(app)
    `,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import { Overmind } from 'overmind'
import { createConnect } from 'overmind-${view}'
import page from 'page'
import state from './state'
import * as actions from './actions'
import * as effects from './effects'

const app = new Overmind({
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
