export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
          code: `
import { Derive } from 'overmind'

export type User = {
  name: string
}

export type State = {
  user: User
  tellUser: Derive<State, (message: string) => {}>
}

export const state: State = {
  user: {
    name: 'John'
  },
  tellUser: (state) =>
    (message) => console.log(message, ', ' + state.user.name)
}
    `,
        },
      ]
    : [
        {
          fileName: 'overmind/state.js',
          code: `
export const state = {
  user: {
    name: 'John'
  },
  tellUser: (state) =>
    (message) => console.log(message, ', ' + state.user.name)
}
    `,
        },
      ]
