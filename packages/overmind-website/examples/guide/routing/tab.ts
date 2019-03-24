export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, mutate, filter } from 'overmind'
import { Page } from './types'

...

export const loadUserWithDetails: <T extends { id: string }>() => Operator<T> = () => 
  mutate(async function loadUserWithDetails({ state, effects }, params) {
    state.isLoadingUserDetails = true
    state.modalUser = await effects.api.getUserWithDetails(params.id)
    state.isLoadingUserDetails = false
  })

export const setCurrentUserModalTabIndex: <T extends { tab: string }>() => Operator<T> = () =>
  mutate(function setCurrentUserModalTabIndex({ state }, params) {
    state.currentUserModalTabIndex = Number(params.tab)
  })
    `,
        },
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

export const showUserModal: Operator<{ id: string, tab: string }> = pipe(
  o.setPage(Page.USERS),
  parallel(
    pipe(
      o.setCurrentUserModalTabIndex(),
      o.shouldLoadUserWithDetails(),
      o.loadUserWithDetails()
    ),
    pipe(
      o.shouldLoadUsers(),
      o.loadUsers()
    )
  )
)
        `,
        },
      ]
    : [
        {
          fileName: 'overmind/operators.js',
          code: `
import { mutate, filter } from 'overmind'

export const closeUserModal = () =>
  mutate(function closeUserModal({ state }) {
    state.modalUser = null
  })

export const setPage = (page) =>
  mutate(function setPage({ state }) {
    state.currentPage = page
  })

export const shouldLoadUsers: <T>() => Operator<T> = () => 
  filter(function shouldLoadUsers({ state }) {
    return !Boolean(state.users.length)
  })

export const loadUsers: <T>() => Operator<T> = () => 
  mutate(async function loadUsers({ state, effects }) {
    state.isLoadingUsers = true
    state.users = await effects.api.getUsers()
    state.isLoadingUsers = false
  })

export const loadUserWithDetails: () => Operator<{ id: string }> = () => 
  mutate(async function loadUserWithDetails({ state, effects }, params) {
    state.isLoadingUserDetails = true
    state.modalUser = await effects.api.getUserWithDetails(params.id)
    state.isLoadingUserDetails = false
  })

export const shouldLoadUserWithDetails: <T>() => Operator<{ id: string }, T> = () => 
  filter(function shouldLoadUserWithDetails({ state }, params) {
    return !state.modalUser || state.modalUser.id !== params.id
  })

export const setCurrentUserModalTabIndex: <T>() => Operator<{ tab: string }, T> = () =>
  mutate(function setCurrentUserModalTabIndex({ state }, params) {
    state.currentUserModalTabIndex = Number(params.tab)
  })
  `,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe, parallel } from 'overmind'
import { Page } from './types'
import * as o from './operators'

export const showHomePage = o.setPage(Page.HOME)

export const showUsersPage = pipe(
  o.setPage(Page.USERS),
  o.closeUserModal(),
  o.shouldLoadUsers(),
  o.loadUsers()
)

export const showUserModal = pipe(
  o.setPage(Page.USERS),
  parallel(
    pipe(
      o.setCurrentUserModalTabIndex(),
      o.shouldLoadUserWithDetails(),
      o.loadUserWithDetails()
    ),
    pipe(
      o.shouldLoadUsers(),
      o.loadUsers()
    )
  )
)
      `,
        },
      ]
