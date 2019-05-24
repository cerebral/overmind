export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { AsyncAction } from 'overmind'

export const loadApp: AsyncAction = async ({ effects, state }) => {
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
