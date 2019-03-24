export default () => [
  {
    fileName: 'operators.ts',
    code: `
import { Operator, mutate, filter, map } from 'overmind'

// You do not need to define any types, which means it defaults
// its input and output to "void"
export const changeSomeState: () => Operator = () =>
  mutate(function changeSomeState({ state }) {
    state.foo = 'bar'
  })

// The second type argument is not set, but will default to "User"
// The output is the same as the input
export const filterAwesomeUser: () => Operator<User> = () =>
  filter(function filterAwesomeUser(_, user) {
    return user.isAwesome
  })

// "map" produces a new output so we define that as the second
// type argument
export const toNumber: () => Operator<string, number> = () =>
  map(function toNumber(_, value) { 
    return Number(value)
  })
    `,
  },
]
