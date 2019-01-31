export default () => [
  {
    fileName: 'overmind/operators.ts',
    code: `
import { Operator, action } from 'overmind'

export const doSomeStateChange: <T>() => Operator<T> =
  () => action(({ state }) => {
    state.foo = 'bar'
  })
    `,
  },
  {
    fileName: 'overmind/actions.ts',
    code: `
import { Operator, pipe, action } from 'overmind'
import { doSomeStateChange } from './operators'

export const setInput: Operator<string> = pipe(
  doSomeStateChange<string>(),
  action(({ value: input, state }) => {
    state.input = input
  })
)
    `,
  },
]
