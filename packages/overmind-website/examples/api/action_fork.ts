export const js = [
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
      admin: adminAction(action),
      superuser: superuserAction(action),
      user: userAction(action)
    })
  `,
  },
]

export const ts = [
  {
    fileName: 'app/operations.js',
    code: `
export const getUserRole: Fork = ({ state }) =>
  state.user.role
  `,
  },
  {
    fileName: 'app/actions.js',
    code: `
export const adminAction: Action = action => action()

export const superuserAction: Action = action => action()

export const userAction: Action = action => action()

export const doThis: Action = action =>
  action()
    .fork(operations.getUserRole, {
      admin: adminAction(action),
      superuser: superuserAction(action),
      user: userAction(action)
    })
  `,
  },
]
