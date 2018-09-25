import App from 'overmind'
import createConnect, { TConnect } from 'overmind-react'
import * as effects from './effects'
import * as actions from './actions'
import * as state from './state'

const config = {
  effects,
  actions,
  state,
}

declare module 'overmind' {
  interface IState extends TState<typeof config> {}
  interface IEffects extends TEffects<typeof config> {}
}

const app = new App(config)

export type Connect = TConnect<typeof app>

export const connect = createConnect(app)

export default app
