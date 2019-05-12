import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = async ({
  state,
  actions,
  effects
}, overmind) => {
  const initialData = await effects.api.getInitialData()
  state.initialData = initialData
}

export default onInitialize
`,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsAppIndex(
            view,
            `
import onInitialize from './onInitialize'
import { state } from './state'
import * as actions from './actions'

export const config = {
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
          fileName: 'overmind/onInitialize.js',
          code: `
const onInitialize = async ({
  state,
  actions,
  effects
}, overmind) => {
  const initialData = await effects.api.getInitialData()
  state.initialData = initialData
}

export default onInitialize
`,
        },
        {
          fileName: 'overmind/index.js',
          code: `
import { createOvermind } from 'overmind'
import onInitialize from './onInitialize'
import { state } from './state'
import * as actions from './actions'

const overmind = createOvermind({
  onInitialize,
  state,
  actions
})

export default overmind
`,
        },
      ]
