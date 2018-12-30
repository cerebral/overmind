export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { fork, Operator } from 'overmind'
import { User } from './state'

export const forkUserType = (paths: {
  [key: string]: Operator<User, any>
}) => fork<User>(({ value: user }) => user.type, paths)
`,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe } from 'overmind'
import { forkUserType, doThis, doThat } from './operators'

export const getUser: Operator<string> = pipe(
  getUser,
  forkUserType({
    admin: doThis,
    superuser: doThat
  })
)
          `,
        },
      ]
    : [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { fork } from 'overmind'

export const forkUserType = (paths) => fork(({ value: user }) => user.type, paths)
`,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { pipe } from 'overmind'
import { forkUserType, doThis, doThat } from './operators'

export const getUser = pipe(
  getUser,
  forkUserType({
    admin: doThis,
    superuser: doThat
  })
)
        `,
        },
      ]
