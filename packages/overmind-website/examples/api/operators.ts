export default (ts) =>
  ts
    ? [
        {
          code: `
import { mutate } from 'overmind'

export const changeFoo = mutate(({ state }) => {
  state.foo = 'bar'
})
`,
        },
      ]
    : [
        {
          code: `
import { mutate } from 'overmind'

export const changeFoo = mutate(({ state }) => {
  state.foo = 'bar'
})
`,
        },
      ]
