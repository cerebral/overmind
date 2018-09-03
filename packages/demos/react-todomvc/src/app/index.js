import App from 'overmind-react'
import * as effects from './effects'
import * as actions from './actions'
import * as state from './state'

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

export const connect = app.connect

export default app
