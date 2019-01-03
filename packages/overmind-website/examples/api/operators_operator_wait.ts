export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe, wait } from 'overmind'
import { executeSomething } from './operators'

export const search: Operator<string> = pipe(
  wait(2000),
  executeSomething
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe, wait } from 'overmind'
import { executeSomething } from './operators'

export const search = pipe(
  wait(2000),
  executeSomething
)
`,
        },
      ]
