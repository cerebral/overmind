import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/index.ts',
          code: tsAppIndex(
            view,
            `
import * as state from './state'
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
import App from 'overmind-${view}'
import * as state from './state'
import * as effects from './effects'
import * as actions from './actions'

const app = new App({
  state,
  effects,
  actions
})

export default app
`,
        },
      ]
