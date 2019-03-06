export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
          code: `
export type User = {
  id: string
  username: string
}

export type State = {
  users: {
    [id: string]: User
  }
  currentUser: User
}

export const state: State = {
  users: {},
  currentUser: null
}
  `,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const setUser: Action<string> = ({ state }, id) => {
  state.currentUser = state.users[id]
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/state.js',
          code: `
export default {
  users: {},
  currentUser: null
}
  `,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
export const setUser = ({ state }, id) => {
  state.currentUser = state.users[id]
}
  `,
        },
      ]
