export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action, Operator, action } from 'overmind'

export const plainAction: Action = ({ value, state }) => {

}

export const functionalAction: Operator = action(({ value, state }) => {

})
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { action } from 'overmind'

export const plainAction = ({ value, state }) => {

}

export const functionalAction = action(({ value, state }) => {

})
`,
        },
      ]
