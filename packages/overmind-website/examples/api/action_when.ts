export const js = [
  {
    fileName: 'app/operations.js',
    code: `
export const hasToken = ({ localStorage }) =>
  Boolean(localStorage.get('token'))
  `,
  },
  {
    fileName: 'app/actions.js',
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
    fileName: 'app/operations.ts',
    code: `
export const hasToken: When = ({ localStorage }) =>
  Boolean(localStorage.get('token'))
  `,
  },
  {
    fileName: 'app/actions.ts',
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
