export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
          code: `
export type User = {
  username: string
  bio: string
}

export type State = {
  isLoading: boolean
  user: User
}

export const state: State = {
  isLoading: false,
  user: null
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/state.js',
          code: `
export default {
  isLoading: false,
  user: null
}
  `,
        },
      ]
