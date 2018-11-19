export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
import { Operator, pipe } from 'overmind'
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

export const showUserModal: Operator<{ id: string }, any> = pipe(
  showUsersPage, // <= We just add the operator managing opening the users page
  o.setModalUserId,
  o.setLoadingUserWithDetails(true),
  o.getUserWithDetails,
  o.updateUserWithDetails,
  o.setLoadingUserWithDetails(false)
)
    `,
        },
      ]
    : [
        {
          fileName: 'app/actions.js',
          code: `
import { pipe } from 'overmind'
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

export const showUserModal = pipe(
  showUsersPage, // <= We just add the operator managing opening the users page
  o.setModalUserId,
  o.setLoadingUserWithDetails(true),
  o.getUserWithDetails,
  o.updateUserWithDetails,
  o.setLoadingUserWithDetails(false)
)
    `,
        },
      ]
