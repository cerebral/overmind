export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/internalActions.ts',
          code: `
import { Action, AsyncAction } from 'overmind'

export const internalActionA: Action<string> = ({ state, effects, actions }, value) {}

export const internalActionB: AsyncAction = async ({ state, effects, actions }) {}
`,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'
import * as internalActions from './internalActions'

export const internal = internalActions

export const myAction: Action = ({ state, effects, actions }) => {
  actions.internal.internalActionA('foo')
  actions.internal.internalActionB()
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/internalActions.js',
          code: `
export const internalActionA = ({ state, effects, actions }, value) {}

export const internalActionB = async ({ state, effects, actions }) {}
`,
        },
        {
          fileName: 'overmind/actions.js',
          code: `
import * as internalActions from './internalActions'

export const internal = internalActions

export const myAction = ({ state, effects, actions }) => {
  actions.internal.internalActionA('foo')
  actions.internal.internalActionB()
}
`,
        },
      ]
