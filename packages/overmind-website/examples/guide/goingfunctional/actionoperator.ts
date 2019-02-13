export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action, Operator, action } from 'overmind'

export const plainAction: Action = ({ state }, value) => {

}

export const functionalAction: Operator = action(({ state }, value) => {

})
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { action } from 'overmind'

export const plainAction = ({ state }, value) => {

}

export const functionalAction = action(({ state }, value) => {

})
`,
        },
      ]
