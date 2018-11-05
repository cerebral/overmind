export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/operators.ts',
          code: `
import { fork, Operator } from 'overmind'

export const forkUserType = (paths: {
  [key: string]: Operator<User>
}) => fork<User>(({ value: user }) => user.type, paths)
`,
        },
        {
          fileName: 'app/actions.ts',
          code: `
import { Pipe, pipe } from 'overmind'
import { forkUserType, doThis, doThat } from './operators'

export const getUser: Pipe<string> = pipe(
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
          fileName: 'app/operators.ts',
          code: `
import { fork } from 'overmind'

export const forkUserType = (paths) => fork(({ value: user }) => user.type, paths)
`,
        },
        {
          fileName: 'app/actions.ts',
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
