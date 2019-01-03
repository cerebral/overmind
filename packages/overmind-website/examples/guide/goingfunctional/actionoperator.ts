export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, Action, action } from 'overmind'

export const normalAction: Action = ({ value, state }) => {

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

export const normalAction = ({ value, state }) => {

}

export const functionalAction = action(({ value, state }) => {

})
  `,
        },
      ]
