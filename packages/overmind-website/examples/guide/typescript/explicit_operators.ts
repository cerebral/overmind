export default () => [
  {
    code: `
import { pipe, map, run } from 'overmind'
import { Config, Operator } from '../'

const toUpperCase = map<string, string, Config>(...)
const doSomething = run<string, Config>(...)

export const doThis: Operator<string, string> = pipe(
  toUpperCase,
  doSomething
)
        `,
  },
]
