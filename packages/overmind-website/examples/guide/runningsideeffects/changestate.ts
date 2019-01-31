export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const getCurrentUser: Action = async ({ effects, state }) => {
  state.currentUser = await effects.api.getCurrentUser()
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
export const getCurrentUser = async ({ effects, state }) => {
  state.currentUser = await effects.api.getCurrentUser()
}
  `,
        },
      ]
