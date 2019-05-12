import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: tsAppIndex(
            view,
            `
import { state } from './state'
import * as effects from './effects'
import * as actions from './actions'

export const config = {
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
          fileName: 'overmind/index.js',
          code: `
import { createOvermind } from 'overmind'
import { createConnect } from 'overmind-${view}'
import state from './state'
import * as effects from './effects'
import * as actions from './actions'

export const overmind = createOvermind({
  state,
  effects,
  actions
})

export const connect = createConnect(overmind)
`,
        },
      ]
