import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/index.ts',
          code: tsAppIndex(
            view,
            `
import { state } from './state'
import * as effects from './effects'
import * as actions from './actions'

const config = {
  state,
  effects,
  actions
}
`
          ),
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import { Overmind } from 'overmind'
import { createConnect } from 'overmind-${view}'
import state from './state'
import * as effects from './effects'
import * as actions from './actions'

export const app = new Overmind({
  state,
  effects,
  actions
})

export const connect = createConnect(app)
`,
        },
      ]
