export default (ts) =>
  ts
    ? [
        {
          fileName: 'operators.ts',
          code: `
import { fork, Operator } from 'overmind'
import { User } from './state'

export const forkUserType: (paths: { [key: string]: Operator<User> }) => Operator<User> = (paths) =>
  fork(function forkUserType(_, user) {
    return user.type
  }, paths)
`,
        },
        {
          fileName: 'actions.ts',
          code: `
import { Operator, pipe } from 'overmind'
import * as o from './operators'
import { UserType } from './state'

export const getUser: Operator<string, User> = pipe(
  o.getUser(),
  o.forkUserType({
    [UserType.ADMIN]: o.doThis(),
    [UserType.SUPERUSER]: o.doThat()
  })
)
          `,
        },
      ]
    : [
        {
          fileName: 'operators.js',
          code: `
import { fork } from 'overmind'

export const forkUserType = (paths) =>
  fork(function forkUserType(_, user) {
    return user.type
  }, paths)
`,
        },
        {
          fileName: 'actions.js',
          code: `
import { pipe } from 'overmind'
import * as o from './operators'

export const getUser = pipe(
  o.getUser(),
  o.forkUserType({
    admin: o.doThis(),
    superuser: o.doThat()
  })
)
        `,
        },
      ]
