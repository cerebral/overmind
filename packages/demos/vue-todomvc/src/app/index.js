import App from 'vue-overmind'
import * as effects from './effects'
import actions from './actions'
import state from './state'

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
