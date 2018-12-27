export default (ts) =>
  ts
    ? [
        {
          code: `
import { action } from 'overmind'

export const setUser = action<User>(({ value: user, state }) => {
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
