export default () => [
  {
    fileName: 'overmind/operators.ts',
    code: `
import { Operator, filter } from 'overmind'

export const filterAwesome: () => Operator<{ isAwesome: boolean }> = () =>
  filter(function filterAwesome(_, somethingAwesome) {
    return somethingAwesome.isAwesome
  })
    `,
  },
  {
    fileName: 'overmind/actions.ts',
    code: `
import { Operator, pipe, action } from 'overmind'
import * as o from './operators'
import { User } from './state'

export const clickedUser: Operator<User> = pipe(
  o.filterAwesome(),
  o.handleAwesomeUser()
)
    `,
  },
]
