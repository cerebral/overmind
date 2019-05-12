export default (ts) =>
  ts
    ? [
        {
          fileName: 'operators.ts',
          code: `
import { Operator, when } from 'overmind'
import { User } from './state'

export const whenUserIsAwesome: (paths: { true: Operator<User>, false: Operator<User> }) => Operator<User> = (paths) => 
  when(function whenUserIsAwesome(_, user) {
    return user.isAwesome
  }, paths)
          `,
        },
      ]
    : [
        {
          fileName: 'operators.js',
          code: `
import { when } from 'overmind'

export const whenUserIsAwesome = (paths) => 
  when(function whenUserIsAwesome(_, user) {
    return user.isAwesome
  }, paths)
        `,
        },
      ]
