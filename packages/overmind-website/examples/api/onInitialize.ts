import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = async ({ value: overmind, state, api }) => {
  const initialData = await api.getInitialData()
  state.initialData = initialData
}

export default onInitialize
`,
        },
        {
          fileName: 'app/index.ts',
          code: tsAppIndex(
            view,
            `
import onInitialize from './onInitialize'
import { state } from './state'
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
          fileName: 'app/onInitialize.js',
          code: `
const onInitialize = async ({ value: overmind, state, api }) => {
  const initialData = await api.getInitialData()
  state.initialData = initialData
}

export default onInitialize
`,
        },
        {
          fileName: 'app/index.js',
          code: `
import { Overmind } from 'overmind'
import onInitialize from './onInitialize'
import { state } from './state'
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
