export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const loadApp: Action = async ({ effects, state }) => {
  state.currentUser = await effects.api.getCurrentUser()
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
export const loadApp = async ({ effects, state }) => {
  state.currentUser = await effects.api.getCurrentUser()
}
  `,
        },
      ]
