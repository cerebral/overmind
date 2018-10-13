import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = (app) => app.actions.loadData()

export default onInitialize
`,
        },
        {
          fileName: 'app/index.ts',
          code: tsAppIndex(
            view,
            `
import onInitialize from './onInitialize'
import * as state from './state'
import * as actions from './actions'

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
          fileName: 'app/onInitialize.ts',
          code: `
export default = (app) => app.actions.loadData()
`,
        },
        {
          fileName: 'app/index.js',
          code: `
import App from 'overmind-${view}'
import onInitialize from './onInitialize'
import * as state from './state'
import * as actions from './actions'

const app = new App({
  onInitialize,
  state,
  actions
})

export default app
`,
        },
      ]
