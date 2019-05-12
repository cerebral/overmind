export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'
import { Page } from './types'

export const showHomePage: Action = ({ state }) => {
  state.currentPage = Page.HOME
}

export const showUsersPage: Action = ({ state, effects }) => {
  state.currentPage = Page.USERS
  state.modalUser = null

  if (!Object.keys(state.users).length) {
    state.isLoadingUsers = true
    state.users = await effects.api.getUsers()
    state.isLoadingUsers = false
  }
}

export const showUserModal: Action<{ id: string, tab: string }> = ({ state, actions }, params) => {
  actions.showUsersPage()
  state.currentUserModalTabIndex = Number(params.tab)
  state.isLoadingUserDetails = true
  state.modalUser = await effects.api.getUserWithDetails(params.id)
  state.isLoadingUserDetails = false
}
    `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.ts',
          code: `
export const showHomePage = ({ state }) => {
  state.currentPage = 'home'
}

export const showUsersPage = ({ state, effects }) => {
  state.currentPage = 'users'
  state.modalUser = null

  if (!Object.keys(state.users).length) {
    state.isLoadingUsers = true
    state.users = await effects.api.getUsers()
    state.isLoadingUsers = false
  }
}

export const showUserModal = ({ state, actions }, params) => {
  actions.showUsersPage()
  state.currentUserModalTabIndex = Number(params.tab)

  if (!state.modalUser || state.modalUser.id !== params.id) {
    state.isLoadingUserDetails = true
    state.modalUser = await effects.api.getUserWithDetails(params.id)
    state.isLoadingUserDetails = false
  }
}
  `,
        },
      ]
