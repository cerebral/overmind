export default (ts) =>
  ts
    ? [
        {
          fileName: 'actions.ts',
          code: `
import { Operator } from 'overmind'
import * as o from './operators'

export const doSomething: Operator = o.forkUserType({
  superuser: o.doThis(),
  admin: o.doThat(),
  other: o.noop()
})
`,
        },
      ]
    : [
        {
          fileName: 'actions.js',
          code: `
import * as o from './operators'

export const doSomething = o.forkUserType({
  superuser: o.doThis(),
  admin: o.doThat(),
  other: o.noop()
})
`,
        },
      ]
