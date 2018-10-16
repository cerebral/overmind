import Overmind, { TApp } from 'overmind'
import createConnect, { TConnect } from 'overmind-react'

import * as actions from './actions'
import * as effects from './effects'
import * as state from './state'

const config = {
  effects,
  actions,
  state,
}

declare module 'overmind' {
  interface App extends TApp<typeof config> {}
}

const app = new Overmind(config)

export type Connect = TConnect<typeof app>

export const connect = createConnect(app)

export default app
