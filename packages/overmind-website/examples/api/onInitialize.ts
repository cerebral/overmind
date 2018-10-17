import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'
import * as operations from './operations'
import * as mutations from './mutations'

const onInitialize: OnInitialize = action =>
  action
    .map(operations.getInitialData)
    .mutate(mutations.setInitialData)

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
import * as operations from './operations'
import * as mutations from './mutations'

const onInitialize = action =>
  action
    .map(operations.getInitialData)
    .mutate(mutations.setInitialData)

export default onInitialize
`,
        },
        {
          fileName: 'app/index.js',
          code: `
import { Overmind } from 'overmind'
import onInitialize from './onInitialize'
import * as state from './state'
import * as actions from './actions'

const app = new Overmind({
  onInitialize,
  state,
  actions
})

export default app
`,
        },
      ]
