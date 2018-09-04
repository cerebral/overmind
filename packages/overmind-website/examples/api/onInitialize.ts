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
import * as actions from './actions'

const onInitialize: Action = actions.initialize

const config = {
  onInitialize,
  state,
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
import * as actions from './actions'

const onInitialize = actions.initialize

const app = new App({
  onInitialize,
  state,
  actions
})

export default app
`,
        },
      ]
