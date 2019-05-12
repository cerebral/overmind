import { tsAppIndex } from '../../templates'

export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const changeCount: Action<number> = ({ state }, countChange) => {
  state.count += countChange
}
`,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsAppIndex(
            'angular',
            `
import { state } from './state'
import * as actions from './actions'

export const config = {
  state,
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
export const config = {
  state: {
    count: 0
  },
  actions: {
    changeCount({ state }, countChange) {
      state.count += countChange
    }
  }
}
`,
        },
      ]
