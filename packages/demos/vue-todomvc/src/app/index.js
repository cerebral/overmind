import Overmind from 'overmind'
import createConnect from 'overmind-vue'
import * as effects from './effects'
import * as actions from './actions'
import * as state from './state'

const app = new Overmind(
  {
    state,
    actions,
    effects,
  },
  {
    devtools: 'localhost:1234',
  }
)

export const connect = createConnect(app)

export default app
