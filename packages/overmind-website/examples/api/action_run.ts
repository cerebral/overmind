export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/operations.ts',
          code: `
import { Operation } from 'overmind'

export const trackSubmitForm: Operation.Run = ({ state, effects }) =>
  effects.track.interaction('login', Boolean(state.user))
    `,
        },
        {
          fileName: 'app/actions.ts',
          code: `
import { Action } from 'overmind'

export const setUser = ({ mutate }) =>
  mutate(mutations.setUser)    

export const setLoginError = ({ mutate }) =>
  mutate(mutations.setLoginError)

export const login: Action = (action) =>
    action
      .attempt(operations.login, {
        success: setUser,
        error: setLoginError
      })
      .run(operations.trackLogin)
  `,
        },
      ]
    : [
        {
          fileName: 'app/operations.js',
          code: `
export const trackSubmitForm = ({ effects }) =>
  effects.track.interaction('submitForm')    
    `,
        },
        {
          fileName: 'app/actions.js',
          code: `
export const doThis = action =>
  action
    .run(operations.trackSubmitForm)
  `,
        },
      ]
