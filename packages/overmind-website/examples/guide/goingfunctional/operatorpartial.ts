export default () => [
  {
    fileName: 'overmind/operators.ts',
    code: `
import { Operator, filter } from 'overmind'

export const filterAwesomeUser: Operator<{ isAwesome: boolean }> =
  filter(({ value: somethingAwesome }) => somethingAwesome.isAwesome)
    `,
  },
  {
    fileName: 'overmind/actions.ts',
    code: `
import { Operator, pipe, action } from 'overmind'
import { filterAwesomeUser } from './operators'
import { User } from './state'

export const clickedUser: Operator<User> = pipe(
  filterAwesomeUser,
  action(({ value: user, state }) => {
    state.awesomeUsersClickedCount++
  })
)
    `,
  },
]
