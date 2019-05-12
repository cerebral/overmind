export default (ts) =>
  ts
    ? [
        {
          fileName: 'operators.ts',
          code: `
import { Operator, run } from 'overmind'

export const doSomething: <T>() => Operator<T> = () =>
  run(function doSomething({ effects }) {
    effects.someApi.doSomething()
  })
`,
        },
      ]
    : [
        {
          fileName: 'operators.js',
          code: `
import { run } from 'overmind'

export const doSomething = () =>
  run(function doSomething({ effects }) {
    effects.someApi.doSomething()
  })
`,
        },
      ]
