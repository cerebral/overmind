export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const myAction: Action = ({ state, effects, actions }) => {

}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.ts',
          code: `
export const myAction = ({ state, effects, actions }) => {

}
`,
        },
      ]
