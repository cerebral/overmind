export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, mutate, filter } from 'overmind'
import { Page } from './types'

export const closeUserModal: <T>() => Operator<T> = () =>
  mutate(({ state }) => {
    state.modalUser = null
  })

export const setPage: <T>(page: Page) => Operator<T> = (page) =>
  mutate(({ state }) => {
    state.currentPage = page
  })

export const shouldLoadUsers: <T>() => Operator<T> = () => 
  filter(({ state }) => {
    return !Boolean(state.users.length)
  })

export const loadUsers: <T>() => Operator<T> = () => 
  mutate(async ({ state, effects }) => {
    state.isLoadingUsers = true
    state.users = await effects.api.getUsers()
    state.isLoadingUsers = false
  })

export const loadUserWithDetails: () => Operator<{ id: string }> = () => 
  mutate(async ({ state, effects }, params) => {
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

export const showHomePage: Operator<{}> = o.setPage(Page.HOME)

export const showUsersPage: Operator<{}> = pipe(
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
  mutate(({ state }) => {
    state.modalUser = null
  })

export const setPage = (page) =>
  mutate(({ state }) => {
    state.currentPage = page
  })

export const shouldLoadUsers = () => 
  filter(({ state }) => {
    return !Boolean(state.users.length)
  })

export const loadUsers = () =>
  mutate(async ({ state, effects }) => {
    state.isLoadingUsers = true
    state.users = await effects.api.getUsers()
    state.isLoadingUsers = false
  })

export const loadUserWithDetails = () => 
  mutate(async ({ state, effects }, params) => {
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
