export default () => [
  {
    fileName: 'overmind/operators.ts',
    code: `
import { Operator, mutate } from 'overmind'

export const doSomething: <T>() => Operator<T> = () =>
  mutate(function doSomething({ state }) {
    state.foo = 'bar'
  })
    `,
  },
]
