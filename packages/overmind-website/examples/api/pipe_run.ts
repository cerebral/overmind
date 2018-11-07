export default (ts) =>
  ts
    ? [
        {
          code: `
import { run } from 'overmind'

export const doSomething = run<string>(({ someEffect }) => someEffect.run())
`,
        },
      ]
    : [
        {
          code: `
import { run } from 'overmind'

export const doSomething = run(({ someEffect }) => someEffect.run())
`,
        },
      ]
