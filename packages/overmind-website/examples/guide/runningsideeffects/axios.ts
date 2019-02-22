import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
export { default as http } from 'axios'
  `,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsAppIndex(
            view,
            `
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

const config = {
  state,
  actions,
  effects
}
    `
          ),
        },
      ]
    : [
        {
          fileName: 'overmind/effects.js',
          code: `
export { default as http } from 'axios'
  `,
        },
        {
          fileName: 'overmind/index.js',
          code: `
import { createOvermind } from 'overmind'
import { createConnect } from 'overmind-${view}'
import state from './state'
import * as actions from './actions'
import * as effects from './effects'

export const overmind = createOvermind({
  state,
  actions,
  effects
})

export const connect = createConnect(overmind)
    `,
        },
      ]
