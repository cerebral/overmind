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

export const setPage: <T>(page: Page) => Operator<T> = () =>
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

export const shouldLoadUserWithDetails: <T>() => Operator<{ id: string }, T> = () => 
  filter(({ state }, params) => {
    return !state.modalUser || state.modalUser.id !== params.id
  })

export const setCurrentUserModalTabIndex: <T>() => Operator<{ tab: string }, T> = () =>
  mutate(({ state }, params) => {
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

export const showHomePage: Operator<{}> = o.setPage(Page.HOME)

export const showUsersPage: Operator<{}> = pipe(
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
  mutate(({ state }) => {
    state.modalUser = null
  })

export const setPage = (page) =>
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

export const shouldLoadUserWithDetails: <T>() => Operator<{ id: string }, T> = () => 
  filter(({ state }, params) => {
    return !state.modalUser || state.modalUser.id !== params.id
  })

export const setCurrentUserModalTabIndex: <T>() => Operator<{ tab: string }, T> = () =>
  mutate(({ state }, params) => {
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
