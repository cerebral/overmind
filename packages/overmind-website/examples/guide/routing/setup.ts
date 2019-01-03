export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const routeHomePage: Action = ({ state }) => {
  state.currentPage = 'home'
}

export const routeUsersPage: Action = async ({ state, api }) => {
  state.user = null
  state.currentPage = 'users'
  state.isLoadingUsers = true
  state.users = await api.getUsers()
  state.isLoadingUsers = false
}

export const routeUser: Action<{ id: string }> = async ({
  value: params,
  state,
  api
}) => {
  state.isLoadingUserDetails = true
  state.modalUser = await api.getUserWithDetails(params.id)
  state.isLoadingUserDetails = false
}
    `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
export const routeHomePage = ({ state }) => {
  state.currentPage = 'home'
}

export const routeUsersPage = async ({ state, api }) => {
  state.user = null
  state.currentPage = 'users'
  state.isLoadingUsers = true
  state.users = await api.getUsers()
  state.isLoadingUsers = false
}

export const routeUser = async ({
  value: params,
  state,
  api
}) => {
  state.isLoadingUserDetails = true
  state.modalUser = await api.getUserWithDetails(params.id)
  state.isLoadingUserDetails = false
}
    `,
        },
      ]
