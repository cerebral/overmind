export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import * as operations from './operations'

export const goDoSomethingWithString: Action<string> = action =>
  action

export const doThis: Action<string> = action =>
  action
    .map(operations.transformString)
    .compose(goDoSomethingWithString)
    `,
        },
      ]
    : [
        {
          fileName: 'app/actions.js',
          code: `
import * as operations from './operations'

export const goDoSomethingWithString = action =>
  action

export const doThis = action =>
  action
    .map(operations.transformString)
    .compose(goDoSomethingWithString)
    `,
        },
      ]
