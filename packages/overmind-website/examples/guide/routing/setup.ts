export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import { Action } from 'overmind'
import * as mutations from './mutations'
import * as operations from './operations'

export const showHomePage: Action = action =>
  action()
    .mutate(mutations.setPage('home'))

export const showUsersPage: Action = action =>
  action()
    .mutate(mutations.unsetModalUserId)
    .mutate(mutations.setPage('users'))
    .mutate(mutations.setLoadingUsers(true))
    .map(operations.getUsers)
    .mutate(mutations.setUsers)
    .mutate(mutations.setLoadingUsers(false))

export const showUserModal: Action<string> = action =>
  action()
    .mutate(mutations.setModalUserId)
    .mutate(mutations.setLoadingUserWithDetails(true))
    .map(operations.getUserWithDetails)
    .mutate(mutations.updateUserWithDetails)
    .mutate(mutations.setLoadingUserWithDetails(false))

export const changeUserModalTab: Action<number> = action =>
  action()
    .mutate(mutations.setUserModalTabIndex)
    `,
        },
      ]
    : [
        {
          fileName: 'app/actions.js',
          code: `
import * as mutations from './mutations'
import * as operations from './operations'

export const showHomePage = action =>
  action()
    .mutate(mutations.setPage('home'))

export const showUsersPage = action =>
  action()
    .mutate(mutations.setPage('users'))
    .mutate(mutations.setLoadingUsers(true))
    .map(operations.getUsers)
    .mutate(mutations.setUsers)
    .mutate(mutations.setLoadingUsers(false))

export const showUser = action =>
  action()
    .mutate(mutations.setModalUserId)
    .mutate(mutations.setLoadingUserWithDetails(true))
    .map(operations.getUserWithDetails)
    .mutate(mutations.updateUserWithDetails)
    .mutate(mutations.setLoadingUserWithDetails(false))

export const changeUserModalTab = action =>
  action()
    .mutate(mutations.setUserModalTabIndex)
    `,
        },
      ]
