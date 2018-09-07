export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import * as mutations from './mutations'
import * as operations from './operations'

export const initializeApp = action =>
  action()
    .mutate(mutations.setLoadingUser)
    .map(operations.getUser)
    .mutate(mutations.setUser)
    .mutate(mutations.unsetLoadingUser)
  `,
        },
      ]
    : [
        {
          fileName: 'app/actions.js',
          code: `
import * as mutations from './mutations'
import * as operations from './operations'

export const initializeApp = action =>
  action()
    .mutate(mutations.setLoadingUser)
    .map(operations.getUser)
    .mutate(mutations.setUser)
    .mutate(mutations.unsetLoadingUser)
  `,
        },
      ]
