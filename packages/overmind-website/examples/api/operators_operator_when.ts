export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe, when } from 'overmind'
import { User } from './state'
import { doThis, doThat } from './operators'

export const getUser: Operator<string, User> = pipe(
  getUser,
  when(({ value: user }) => user.isAwesome, {
    true: doThis,
    false: doThat
  })
)
          `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { when, pipe } from 'overmind'
import { doThis, doThat } from './operators'

export const getUser = pipe(
  getUser,
  when(({ value: user }) => user.isAwesome, {
    true: doThis,
    false: doThat
  })
)
        `,
        },
      ]
