export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, action } from 'overmind'

export const setUser: Operator<User> = action(({ value: user, state }) => {
  state.user = user
})
`,
        },
      ]
    : [
        {
          code: `
import { action } from 'overmind'

export const setUser = action(({ value: user, state }) => {
  state.user = user
})
`,
        },
      ]
