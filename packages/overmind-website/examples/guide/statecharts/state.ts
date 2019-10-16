export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/login/state.ts',
          code: `
export type User = {
  id: string
  name: string
}

type State = {
  username: string
  password: string
  user: User
  authenticationError: string
}

export const state: State = {
  username: '',
  password: '',
  user: null,
  authenticationError: null
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/login/state.ts',
          code: `
export const state = {
  username: '',
  password: '',
  user: null,
  authenticationError: null
}
`,
        },
      ]
