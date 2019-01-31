export default () => [
  {
    fileName: 'overmind/operators.ts',
    code: `
import { Operator, filter } from 'overmind'

export const filterAwesome: Operator<{ isAwesome: boolean }> =
  filter(({ value: somethingAwesome }) => somethingAwesome.isAwesome)
    `,
  },
  {
    fileName: 'overmind/actions.ts',
    code: `
import { Operator, pipe, action } from 'overmind'
import { filterAwesome } from './operators'
import { User } from './state'

export const clickedUser: Operator<User> = pipe(
  // We get an error here, because this operator explicitly
  // outputs the type { isAwesome: boolean }
  filterAwesome,
  action(({ value: user, state }) => {
    state.awesomeUsersClickedCount++
  })
)
    `,
  },
]
