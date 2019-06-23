import { tsAppIndex, tsSimpleAppIndex } from '../../templates'

export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const myAction: Action = (context) => {

}
`,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsSimpleAppIndex(
            `
import * as actions from './actions'

export const config = {
  actions
}
`
          ),
        },
      ]
    : [
        {
          fileName: 'overmind/actions.ts',
          code: `
export const myAction = (context) => {

}
`,
        },
        {
          fileName: 'overmind/index.js',
          code: `
import * as actions from './actions'

export const config = {
  actions
}
`,
        },
      ]
