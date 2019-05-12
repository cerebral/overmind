export default (ts) =>
  ts
    ? [
        {
          fileName: 'actions.ts',
          code: `
import { Operator, pipe, mutate, catchError } from 'overmind'

export const doSomething: Operator<string> = pipe(
  mutate(() => {
    throw new Error('foo')
  }),
  mutate(() => {
    // This one is skipped
  })
  catchError(({ state }, error) => {
    state.error = error.message

    return 'value_to_be_passed_on'
  }),
  mutate(() => {
    // This one continues executing with replaced value
  })
)
`,
        },
      ]
    : [
        {
          fileName: 'actions.js',
          code: `
import { pipe, mutate, catchError } from 'overmind'

export const doSomething = pipe(
  mutate(() => {
    throw new Error('foo')
  }),
  mutate(() => {
    // This one is skipped
  })
  catchError(({ state }, error) => {
    state.error = error.message

    return 'value_to_be_passed_on'
  }),
  mutate(() => {
    // This one continues executing with replaced value
  })
)
`,
        },
      ]
