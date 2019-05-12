export default (ts) =>
  ts
    ? [
        {
          fileName: 'operators.ts',
          code: `
import { Operator, mutate } from 'overmind'

export const setUser: () => Operator<User> = () =>
  mutate(function setUser({ state }, user) {
    state.user = user
  })
`,
        },
      ]
    : [
        {
          fileName: 'operators.js',
          code: `
import { mutate } from 'overmind'

export const setUser = () =>
  mutate(function setUser({ state }, user) {
    state.user = user
  })
`,
        },
      ]
