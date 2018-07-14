import App, { TConnect, TContext, IAction } from 'overmind/react'
import * as providers from './providers'
import actions from './actions'
import state from './state'

export type Context = TContext<typeof state, typeof providers>

export type Action = IAction<typeof state, Context>

const app = new App(
  {
    state,
    actions,
    providers,
  },
  {
    devtools: 'localhost:1234',
  }
)

export type Connect = TConnect<typeof app.state, typeof app.actions>

export const connect = app.connect.bind(app)

export default app
