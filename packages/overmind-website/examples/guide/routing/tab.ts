export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action, Operator, action, parallel } from 'overmind'

export const showHomePage: Action = ({ state }) => {
  state.currentPage = 'home'
}

export const showUsersPage: Operator<{ id?: string, tab?: string }> = action(async ({
  value: params,
  state,
  effects
}) => {
  if (!params.id) state.modalUser = null

  state.currentPage = 'users'
  state.isLoadingUsers = true
  state.users = await effects.api.getUsers()
  state.isLoadingUsers = false
})

export const showUserModal: Operator<{ id: string, tab: string }> = parallel(
  showUsersPage,
  action(async ({
    value: params,
    state,
    effects
  }) => {
    state.currentUserModalTabIndex = Number(params.tab)
    
    if (state.modalUser && state.modalUser.id === params.id) return

    state.isLoadingUserDetails = true
    state.modalUser = await effects.api.getUserWithDetails(params.id)
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

export const showUsersPage = async ({ value: params, state, effects }) => {
  if (!params.id) state.modalUser = null

  state.currentPage = 'users'
  state.isLoadingUsers = true
  state.users = await effects.api.getUsers()
  state.isLoadingUsers = false
}

export const showUserModal = pipe(
  parallel(
    showUsersPage,
    action(async ({ value: params, state, effects }) => {
      state.currentUserModalTabIndex = Number(params.tab)
      
      if (state.modalUser && state.modalUser.id === params.id) return

      state.isLoadingUserDetails = true
      state.modalUser = await effects.api.getUserWithDetails(params.id)
      state.isLoadingUserDetails = false
    })
  )
)
    `,
        },
      ]
