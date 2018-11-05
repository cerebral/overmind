export default (ts) =>
  ts
    ? [
        {
          code: `
import { mutate } from 'overmind'

export const setUser = mutate<User>(({ value: user, state }) => {
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
