import App from 'overmind'
import createConnect from 'overmind-react'
import * as effects from './effects'
import * as actions from './actions'
import * as state from './state'

const app = new App({
  state,
  actions,
  effects,
})

export const connect = createConnect(app)

export default app
