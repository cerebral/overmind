export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, filter } from 'overmind'
import { User } from '../overmind/state'

export const filterAwesomeUser: Operator<User> =
  filter(({ value: user }) => user.isAwesome)
`,
        },
      ]
    : [
        {
          fileName: 'overmind/operators.js',
          code: `
import { filter } from 'overmind'

export const filterAwesomeUser =
  filter(({ value: user }) => user.isAwesome)
            `,
        },
      ]
