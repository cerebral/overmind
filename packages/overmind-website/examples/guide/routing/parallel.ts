export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe, parallel } from 'overmind'
import { Page } from './types'
import * as o from './operators'

export const showHomePage: Operator<void> = o.setPage(Page.HOME)

export const showUsersPage: Operator<void> = pipe(
  o.setPage(Page.USERS),
  o.closeUserModal(),
  o.shouldLoadUsers(),
  o.loadUsers()
)

export const showUserModal: Operator<{ id: string }> = pipe(
  o.setPage(Page.USERS),
  parallel(
    o.loadUserWithDetails(),
    pipe(
      o.shouldLoadUsers(),
      o.loadUsers()
    ),
  )
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

export const showHomePage = o.setPage('home')

export const showUsersPage = pipe(
  o.setPage('users'),
  o.closeUserModal(),
  o.shouldLoadUsers(),
  o.loadUsers()
)

export const showUserModal = pipe(
  o.setPage('users'),
  parallel(
    o.loadUserWithDetails(),
    pipe(
      o.shouldLoadUsers(),
      o.loadUsers()
    )
  )
)
  `,
        },
      ]
