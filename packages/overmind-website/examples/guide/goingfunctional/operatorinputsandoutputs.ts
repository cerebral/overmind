export default () => [
  {
    code: `
import { Operator, action, filter, map } from 'overmind'

// You do not need to define any types, which means it defaults
// its input and output to "void"
export const changeSomeState: Operator = action(({ state }) => {
  state.foo = 'bar'
})

// The second type argument is not set, but will default to "User"
// The output is the same as the input
export const filterAwesomeUser: Operator<User> =
  filter(({ value: user }) => user.isAwesome)

// "map" produces a new output so we define that as the second
// type argument
export const getEventTargetValue: Operator<Event, string> =
  map(({ value: event }) => event.currentTarget.value)
    `,
  },
]
