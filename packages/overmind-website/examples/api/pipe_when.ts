export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/operators.ts',
          code: `
import { when, Operator } from 'overmind'

export const whenAwesomeUser = (paths: {
  true: Operator<User>,
  false: Operator<User>
}) => when<User>(({ value: user }) => user.isAwesome, paths)
`,
        },
        {
          fileName: 'app/actions.ts',
          code: `
import { Pipe, pipe } from 'overmind'
import { User } from './state'
import { whenAwesomeUser, doThis, doThat } from './operators'

export const getUser: Pipe<string, User> = pipe(
  getUser,
  whenAwesomeUser({
    true: doThis,
    false: doThat
  })
)
          `,
        },
      ]
    : [
        {
          fileName: 'app/operators.ts',
          code: `
import { when } from 'overmind'

export const whenAwesomeUser = (paths) => when(({ value: user }) => user.isAwesome, paths)
`,
        },
        {
          fileName: 'app/actions.ts',
          code: `
import { pipe } from 'overmind'
import { whenAwesomeUser, doThis, doThat } from './operators'

export const getUser = pipe(
  getUser,
  whenAwesomeUser({
    true: doThis,
    false: doThat
  })
)
        `,
        },
      ]
