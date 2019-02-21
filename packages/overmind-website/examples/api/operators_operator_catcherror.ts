export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, pipe, action, catchError } from 'overmind'

export const doSomething: Operator<string> = pipe(
  action(() => {
    throw new Error('foo')
  }),
  action(() => {
    // This one is skipped
  })
  catchError(({ state }, error) => {
    state.error = error.message

    return 'value_to_be_passed_on'
  }),
  action(() => {
    // This one continues executing with replaced value
  })
)
`,
        },
      ]
    : [
        {
          code: `
import { pipe, action, catchError } from 'overmind'

export const doSomething = pipe(
  action(() => {
    throw new Error('foo')
  }),
  action(() => {
    // This one is skipped
  })
  catchError(({ state }, error) => {
    state.error = error.message

    return 'value_to_be_passed_on'
  }),
  action(() => {
    // This one continues executing with replaced value
  })
)
`,
        },
      ]
