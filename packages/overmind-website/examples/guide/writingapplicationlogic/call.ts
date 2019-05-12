export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const myAction: Action = ({ state, effects, actions }) => {
  actions.myOtherAction('foo')
}

export const myOtherAction: Action<string> = ({ state, effects, actions }, value) {

} 
`,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.ts',
          code: `
export const myAction = ({ state, effects, actions }) => {
  actions.myOtherAction('foo')
}

export const myOtherAction = ({ state, effects, actions }, value) => {

} 
`,
        },
      ]
