export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/login/actions.ts',
          code: `
import { Action, AsyncAction } from 'overmind'
import { User } from './state'

export const changeUsername: Action<string> = ({ state }, username) => {
  state.login.username = username
}

export const changePassword: Action<string> = ({ state }, password) => {
  state.login.password = password
}

export const login: AsyncAction = ({ state, actions, effects }) => {
  try {
    const user = await effects.api.login(state.username, state.password)
    actions.login.resolveUser(user)
  } catch (error) {
    actions.login.rejectUser(error)
  }
}

export const resolveUser: Action<User> = ({ state }, user) => {
  state.login.user = user
}

export const rejectUser: Action<Error> = ({ state }, error) => {
  state.login.authenticationError = error.message
}

export const logout: Action = ({ effects }) => {
  effects.api.logout()
}

export const tryAgain: Action = () => {}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/login/actions.ts',
          code: `
export const changeUsername = ({ state }, username) => {
  state.login.username = username
}

export const changePassword = ({ state }, password) => {
  state.login.password = password
}

export const login = ({ state, actions, effects }) => {
  try {
    const user = await effects.api.login(state.username, state.password)
    actions.login.resolveUser(user)
  } catch (error) {
    actions.login.rejectUser(error)
  }
}

export const resolveUser = ({ state }, user) => {
  state.login.user = user
}

export const rejectUser = ({ state }, error) => {
  state.login.authenticationError = error.message
}

export const logout = ({ effects }) => {
  effects.api.logout()
}

export const tryAgain = () => {}
`,
        },
      ]
