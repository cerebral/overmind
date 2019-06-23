import { tsAppIndex, tsSimpleAppIndex } from '../../templates'

export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const increaseCount: Action = ({ state }) => {
  state.count += 1
}

export const decreaseCount: Action = ({ state }) => {
  state.count -= 1
}
`,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsSimpleAppIndex(
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
          fileName: 'overmind/actions.js',
          code: `
export const increaseCount = ({ state }) => {
  state.count += 1
}

export const decreaseCount = ({ state }) => {
  state.count -= 1
}
`,
        },
        {
          fileName: 'overmind/index.js',
          code: `
import { state } from './state'
import * as actions from './actions'

export const config = {
  state,
  actions
}
`,
        },
      ]
