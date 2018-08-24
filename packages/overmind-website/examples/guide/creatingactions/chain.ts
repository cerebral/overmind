export const js = [
  {
    fileName: 'app/actions.js',
    code: `
import * as mutations from './mutations'
import * as operations from './operations'

export const initializeApp = action =>
  action()
    .mutation(mutations.setLoadingUser)
    .map(operations.getUser)
    .mutation(mutations.setUser)
    .mutation(mutations.unsetLoadingUser)
  `,
  },
]

export const ts = [
  {
    fileName: 'app/actions.ts',
    code: `
import * as mutations from './mutations'
import * as operations from './operations'

export const initializeApp = action =>
  action()
    .mutation(mutations.setLoadingUser)
    .map(operations.getUser)
    .mutation(mutations.setUser)
    .mutation(mutations.unsetLoadingUser)
  `,
  },
]
