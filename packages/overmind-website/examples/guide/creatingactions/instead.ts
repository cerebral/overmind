export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import { Action, action } from 'overmind'

export const initializeApp: Action = action
  `,
        },
      ]
    : [
        {
          fileName: 'app/actions.js',
          code: `
import { action } from 'overmind'

export const initializeApp = action
  `,
        },
      ]
