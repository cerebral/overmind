import App, { TConnect, TEffects, TAction } from 'react-overmind'
import * as effects from './effects'
import actions from './actions'
import state from './state'

export type Effects = TEffects<typeof state, typeof effects>

export type Action = TAction<typeof state, Effects>

const app = new App(
  {
    state,
    actions,
    effects,
  },
  {
    devtools: 'localhost:1234',
  }
)

export type Connect = TConnect<typeof app.state, typeof app.actions>

export const connect = app.connect

export default app
