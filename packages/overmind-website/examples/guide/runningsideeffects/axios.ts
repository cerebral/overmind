import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/effects.ts',
          code: `
export { default as http } from 'axios'
  `,
        },
        {
          fileName: 'app/index.ts',
          code: tsAppIndex(
            view,
            `
import * as state from './state'
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
          fileName: 'app/effects.js',
          code: `
export { default as http } from 'axios'
  `,
        },
        {
          fileName: 'app/index.js',
          code: `
import { Overmind } from 'overmind'
import { createConnect } from 'overmind-${view}'
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

export const app = new Overmind({
  state,
  actions,
  effects
})

export const connect = createConnect(app)
    `,
        },
      ]
