export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import { Action } from 'overmind'

export const initializeApp: Action = action =>
  action
  `,
        },
      ]
    : [
        {
          fileName: 'app/actions.js',
          code: `
export const initializeApp = action =>
  action
  `,
        },
      ]
