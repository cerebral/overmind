export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe, parallel } from 'overmind'
import * as o from './operators'

export const showHomePage: Operator<void, any> =
  o.setPage('home')

export const showUsersPage: Operator<void, any> = pipe(
  o.unsetModalUserId,
  o.setPage('users'),
  o.setLoadingUsers(true),
  o.getUsers,
  o.setUsers,
  o.setLoadingUsers(false)
)

const getUserWithDetails: Operator<{ id: string }, any> = pipe(
  o.setLoadingUserWithDetails(true),
  o.getUserWithDetails,
  o.updateUserWithDetails,
  o.setLoadingUserWithDetails(false)
)

export const showUserModal: Operator<{ id: string, tab: string }, any> = pipe(
  o.setModalUserId,
  o.setUserModalTabIndex,
  parallel([
    showUsersPage,
    getUserWithDetails
  ])
)
    `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe, parallel } from 'overmind'
import * as o from './operators'

export const showHomePage =
  o.setPage('home')

export const showUsersPage = pipe(
  o.unsetModalUserId,
  o.setPage('users'),
  o.setLoadingUsers(true),
  o.getUsers,
  o.setUsers,
  o.setLoadingUsers(false)
)

const getUserWithDetails = pipe(
  o.setLoadingUserWithDetails(true),
  o.getUserWithDetails,
  o.updateUserWithDetails,
  o.setLoadingUserWithDetails(false)
)

export const showUserModal = pipe(
  o.setModalUserId,
  o.setUserModalTabIndex,
  parallel([
    showUsersPage,
    getUserWithDetails
  ])
)
    `,
        },
      ]
