export const js = [
  {
    fileName: 'operations.js',
    code: `
export const hasToken = ({ localStorage }) =>
  Boolean(localStorage.get('token'))
  `,
  },
  {
    fileName: 'actions.js',
    code: `
export const withTokenAction = action => action()

export const withoutTokenAction = action => action()

export const doThis = action =>
  action()
    .when(operations.hasToken, {
      true: withTokenAction(action),
      false: withoutTokenAction(action)
    })
    `,
  },
]

export const ts = [
  {
    fileName: 'operations.ts',
    code: `
export const hasToken: When = ({ localStorage }) =>
  Boolean(localStorage.get('token'))
  `,
  },
  {
    fileName: 'actions.ts',
    code: `
export const withTokenAction: Action = action => action()

export const withoutTokenAction: Action = action => action()

export const doThis: Action = action =>
  action()
    .when(operations.hasToken, {
      true: withTokenAction(action),
      false: withoutTokenAction(action)
    })
    `,
  },
]
