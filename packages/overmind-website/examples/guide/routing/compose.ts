export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import { Action } from 'overmind'
import * as mutations from './mutations'
import * as operations from './operations'

...

export const showUserModal: Action<string> = action =>
  action
    .compose(showUsersPage) // <-- WE ADD COMPOSE
    .mutate(mutations.setModalUserId)
    .mutate(mutations.setLoadingUserWithDetails(true))
    .map(operations.getUserWithDetails)
    .mutate(mutations.updateUserWithDetails)
    .mutate(mutations.setLoadingUserWithDetails(false))

...
  `,
        },
      ]
    : [
        {
          fileName: 'app/actions.js',
          code: `
import * as mutations from './mutations'
import * as operations from './operations'

...

export const showUser = action =>
  action
    .compose(showUsersPage) // <-- WE ADD COMPOSE
    .mutate(mutations.setModalUserId)
    .mutate(mutations.setLoadingUserWithDetails(true))
    .map(operations.getUserWithDetails)
    .mutate(mutations.updateUserWithDetails)
    .mutate(mutations.setLoadingUserWithDetails(false))

...
  `,
        },
      ]
