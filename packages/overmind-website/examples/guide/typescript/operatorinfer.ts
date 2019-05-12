export default () => [
  {
    fileName: 'overmind/operators.ts',
    code: `
import { Operator, mutate } from 'overmind'

export const doSomething: () => Operator = () =>
  mutate(function doSomething({ state }) {
    state.foo = 'bar'
  })
    `,
  },
  {
    fileName: 'overmind/actions.ts',
    code: `
import { Operator, pipe, action } from 'overmind'
import * as o from './operators'

export const setInput: Operator<string> = pipe(
  o.doSomething(),
  o.setValue()
)
    `,
  },
]
