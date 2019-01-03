export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const getCurrentUser: Action = async ({ api, state }) => {
  state.currentUser = await api.getCurrentUser()
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
export const getCurrentUser = async ({ api, state }) => {
  state.currentUser = await api.getCurrentUser()
}
  `,
        },
      ]
