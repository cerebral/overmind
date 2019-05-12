export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const myAction: Action = ({ state, effects, actions }) => {
  actions.internal.internalActionA()
  actions.internal.internalActionB('foo')
}

export const internal: {
  internalActionA: Action,
  internalActionB: Action<string>
} = {
  internalActionA: ({ state, effects, actions }) {},
  internalActionB: ({ state, effects, actions }, value) {},
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.ts',
          code: `
export const myAction = ({ state, effects, actions }) => {
  actions.internal.internalActionA()
  actions.internal.internalActionB('foo')
}

export const internal = {
  internalActionA: ({ state, effects, actions }) {},
  internalActionB: ({ state, effects, actions }, value) {},
}
`,
        },
      ]
