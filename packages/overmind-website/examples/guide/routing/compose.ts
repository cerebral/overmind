export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, mutate, filter } from 'overmind'
import { Page } from './types'

export const closeUserModal: <T>() => Operator<T> = () =>
  mutate(function closeUserModal({ state }) {
    state.modalUser = null
  })

export const setPage: <T>(page: Page) => Operator<T> = (page) =>
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
`,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe } from 'overmind'
import { Page } from './types'
import * as o from './operators'

export const showHomePage: Operator = o.setPage(Page.HOME)

export const showUsersPage: Operator = pipe(
  o.setPage(Page.USERS),
  o.closeUserModal(),
  o.shouldLoadUsers(),
  o.loadUsers()
)

export const showUserModal: Operator<{ id: string }> = pipe(
  o.setPage(Page.USERS),
  o.loadUserWithDetails(),
  o.shouldLoadUsers(),
  o.loadUsers(),
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

export const shouldLoadUsers = () => 
  filter(function shouldLoadUsers({ state }) {
    return !Boolean(state.users.length)
  })

export const loadUsers = () =>
  mutate(async function loadUsers({ state, effects }) {
    state.isLoadingUsers = true
    state.users = await effects.api.getUsers()
    state.isLoadingUsers = false
  })

export const loadUserWithDetails = () => 
  mutate(async function loadUserWithDetails({ state, effects }, params) {
    state.isLoadingUserDetails = true
    state.modalUser = await effects.api.getUserWithDetails(params.id)
    state.isLoadingUserDetails = false
  })
`,
        },
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe } from 'overmind'
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
  o.loadUserWithDetails(),
  o.shouldLoadUsers(),
  o.loadUsers(),
)
  `,
        },
      ]
