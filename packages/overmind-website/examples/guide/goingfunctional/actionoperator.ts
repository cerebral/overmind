export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action, fromOperator, action } from 'overmind'

export const plainAction: Action = ({ value, state }) => {

}

export const functionlAction: Action = fromOperator(
  action(({ value, state }) => {

  })
)
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { fromOperator, action } from 'overmind'

export const plainAction = ({ value, state }) => {

}

export const functionlAction = fromOperator(
  action(({ value, state }) => {

  })
)
`,
        },
      ]
