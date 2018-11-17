export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/state.ts',
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
          fileName: 'app/state.js',
          code: `
export default {
  isLoading: false,
  user: null
}
  `,
        },
      ]
