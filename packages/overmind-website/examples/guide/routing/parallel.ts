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

export const showUsersPage: Action<any> = action =>
  action
    .mutate(mutations.unsetModalUserId)
    .mutate(mutations.setPage('users'))
    .mutate(mutations.setLoadingUsers(true))
    .map(operations.getUsers)
    .mutate(mutations.setUsers)
    .mutate(mutations.setLoadingUsers(false))

const getUserWithDetails: Action<string> = action =>
  action
    .mutate(mutations.setLoadingUserWithDetails(true))
    .map(operations.getUserWithDetails)
    .mutate(mutations.updateUserWithDetails)
    .mutate(mutations.setLoadingUserWithDetails(false))

export const showUserModal: Action<string> = action =>
  action
    .mutate(mutations.setModalUserId)
    .parallel([
      showUsersPage,
      getUserWithDetails
    ])

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

export const showUsersPage = action =>
  action
    .mutate(mutations.unsetModalUserId)
    .mutate(mutations.setPage('users'))
    .mutate(mutations.setLoadingUsers(true))
    .map(operations.getUsers)
    .mutate(mutations.setUsers)
    .mutate(mutations.setLoadingUsers(false))

const getUserWithDetails = action =>
  action
    .mutate(mutations.setLoadingUserWithDetails(true))
    .map(operations.getUserWithDetails)
    .mutate(mutations.updateUserWithDetails)
    .mutate(mutations.setLoadingUserWithDetails(false))

export const showUserModal = action =>
  action
    .mutate(mutations.setModalUserId)
    .parallel([
      showUsersPage,
      getUserWithDetails
    ])

...
  `,
        },
      ]
