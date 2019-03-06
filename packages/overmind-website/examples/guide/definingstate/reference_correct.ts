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
  currentUserId: string
  currentUser: User
}

export const state: State = {
  users: {},
  currentUserId: null,
  get currentUser(this: State) {
    return this.users[this.currentUserId]
  } 
}
  `,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const setUser: Action<string> = ({ state }, id) => {
  state.currentUserId = id
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
  currentUserId: null
  get currentUser() {
    return this.users[this.currentUserId]
  }
}
  `,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
export const setUser = ({ state }, id) => {
  state.currentUserId = id
}
  `,
        },
      ]
