export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action, Operator, pipe, action } from 'overmind'

export const showHomePage: Action = ({ state }) => {
  state.currentPage = 'home'
}

export const showUsersPage: Operator<{ id?: string }> = action(async ({
  value: params,
  state,
  api
}) => {
  if (!params.id) state.modalUser = null

  state.currentPage = 'users'
  state.isLoadingUsers = true
  state.users = await api.getUsers()
  state.isLoadingUsers = false
})

export const showUserModal: Operator<{ id: string }> = pipe(
  showUsersPage,
  action(async ({
    value: params,
    state,
    api
  }) => {
    state.isLoadingUserDetails = true
    state.modalUser = await api.getUserWithDetails(params.id)
    state.isLoadingUserDetails = false
  })
)
    `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe, action } from 'overmind'

export const showHomePage = ({ state }) => {
  state.currentPage = 'home'
}

export const showUsersPage = action(async ({ state, api }) => {
  state.modalUser = null
  state.currentPage = 'users'
  state.isLoadingUsers = true
  state.users = await api.getUsers()
  state.isLoadingUsers = false
})

export const showUserModal = pipe(
  showUsersPage,
  action(async ({ value: params, state, api }) => {
    state.isLoadingUserDetails = true
    state.modalUser = await api.getUserWithDetails(params.id)
    state.isLoadingUserDetails = false
  })
)
    `,
        },
      ]
