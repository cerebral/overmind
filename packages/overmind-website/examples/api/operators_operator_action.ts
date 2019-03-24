export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, mutate } from 'overmind'

export const setUser: Operator<User> = mutate(({ value: user, state }) => {
  state.user = user
})
`,
        },
      ]
    : [
        {
          code: `
import { mutate } from 'overmind'

export const setUser = mutate(({ value: user, state }) => {
  state.user = user
})
`,
        },
      ]
