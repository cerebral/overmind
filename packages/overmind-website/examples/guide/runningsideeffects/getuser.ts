export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'
import { User } from './state'

export const getCurrentUser: Action = async ({ effects, state }) => {
  state.currentUser = await effects.http.get<User>('/user')
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
export const getCurrentUser = async ({ effects, state }) => {
  state.currentUser = await effects.http.get('/user')
}
  `,
        },
      ]
