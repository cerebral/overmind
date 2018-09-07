export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/operations.js',
          code: `
import { Operation } from 'overmind'

export const getUserRole: Operation.Fork = ({ state }) =>
  state.user.role
  `,
        },
        {
          fileName: 'app/actions.js',
          code: `
import { Action } from 'overmind'

export const adminAction: Action = action => action()

export const superuserAction: Action = action => action()

export const userAction: Action = action => action()

export const doThis: Action = action =>
  action()
    .fork(operations.getUserRole, {
      admin: adminAction,
      superuser: superuserAction,
      user: userAction
    })
  `,
        },
      ]
    : [
        {
          fileName: 'app/operations.js',
          code: `
export const getUserRole = ({ state }) =>
  state.user.role
  `,
        },
        {
          fileName: 'app/actions.js',
          code: `
export const adminAction = action => action()

export const superuserAction = action => action()

export const userAction = action => action()

export const doThis = action =>
  action()
    .fork(operations.getUserRole, {
      admin: adminAction,
      superuser: superuserAction,
      user: userAction
    })
  `,
        },
      ]
