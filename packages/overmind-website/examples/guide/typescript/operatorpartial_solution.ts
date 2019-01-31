export default () => [
  {
    fileName: 'overmind/operators.ts',
    code: `
import { Operator, filter } from 'overmind'

export const filterAwesome: <T>() => Operator<{ isAwesome: boolean }, T> =
  () => filter(({ value: somethingAwesome }) => somethingAwesome.isAwesome)
    `,
  },
  {
    fileName: 'overmind/actions.ts',
    code: `
import { Operator, pipe, action } from 'overmind'
import { filterAwesome } from './operators'
import { User } from './state'

export const clickedUser: Operator<User> = pipe(
  filterAwesome<User>(),
  action(({ value: user, state }) => {
    state.awesomeUsersClickedCount++
  })
)
    `,
  },
]
