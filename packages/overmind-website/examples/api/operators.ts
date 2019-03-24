export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, mutate } from 'overmind'

export const changeFoo: Operator = mutate(({ state }) => {
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
