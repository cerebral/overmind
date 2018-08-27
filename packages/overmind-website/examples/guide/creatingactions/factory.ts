export const js = [
  {
    fileName: 'app/actions.js',
    code: `
export const initializeApp = action =>
  action()
  `,
  },
]

export const ts = [
  {
    fileName: 'app/actions.ts',
    code: `
import { Action } from 'overmind'

export const initializeApp: Action = action =>
  action()
  `,
  },
]
