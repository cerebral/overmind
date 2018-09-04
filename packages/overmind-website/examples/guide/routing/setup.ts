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
    .mutate(mutations.setPage('users'))
    .mutate(mutations.setLoadingUsers(true))
    .map(operations.getUsers)
    .mutate(mutations.setUsers)
    .mutate(mutations.setLoadingUsers(false))

export const showUser: Action<string> = action =>
  action()
    .mutate(mutations.setCurrentUserId)

export const changeUserTab: Action<number> = action =>
  action()
    .mutate(mutations.setUserTabIndex)
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
    .mutate(mutations.setCurrentUserId)

export const changeUserTab = action =>
  action()
    .mutate(mutations.setUserTabIndex)
    `,
        },
      ]
