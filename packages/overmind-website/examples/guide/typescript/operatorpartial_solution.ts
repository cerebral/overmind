export default () => [
  {
    fileName: 'overmind/operators.ts',
    code: `
import { Operator, filter } from 'overmind'

export const filterAwesome: <T extends { isAwesome: boolean }>() => Operator<T> = () =>
  filter(function filterAwesome(_, somethingAwesome) {
    return somethingAwesome.isAwesome
  })
    `,
  },
]
