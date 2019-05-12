export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const showHomePage: Action = ({ state }) => {
  state.currentPage = 'home'
}

export const showUsersPage: Action = async ({ state, effects }) => {
  state.modalUser = null
  state.currentPage = 'users'
  state.isLoadingUsers = true
  state.users = await effects.api.getUsers()
  state.isLoadingUsers = false
}

export const showUserModal: Action<{ id: string }> = async ({ state, effects }, params) => {
  state.isLoadingUserDetails = true
  state.modalUser = await effects.api.getUserWithDetails(params.id)
  state.isLoadingUserDetails = false
}
    `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
export const showHomePage = ({ state }) => {
  state.currentPage = 'home'
}

export const showUsersPage = async ({ state, api }) => {
  state.modalUser = null
  state.currentPage = 'users'
  state.isLoadingUsers = true
  state.users = await api.getUsers()
  state.isLoadingUsers = false
}

export const showUserModal = async ({ state, api }, params) => {
  state.isLoadingUserDetails = true
  state.modalUser = await api.getUserWithDetails(params.id)
  state.isLoadingUserDetails = false
}
    `,
        },
      ]
