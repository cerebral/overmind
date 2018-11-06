export default (ts) =>
  ts
    ? [
        {
          code: `
import { Pipe, pipe, wait } from 'overmind'
import { executeSomething } from './operators'

export const search: Pipe<string, string> = pipe(
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
