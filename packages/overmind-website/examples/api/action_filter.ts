export const js = [
  {
    fileName: 'app/operations.js',
    code: `
export const isOnline = ({ connection }) =>
  connection.isOnline()

export const isGreaterThan2 = (_, value) =>
  value.length > 2
  `,
  },
  {
    fileName: 'app/actions.js',
    code: `
export const doThis = action =>
  action()
    .filter(operations.isOnline)
    .filter(operations.isGreaterThan2)
  `,
  },
]

export const ts = [
  {
    fileName: 'app/operations.ts',
    code: `
export const isOnline: Filter = ({ connection }) =>
  connection.isOnline()

export const isGreatherThan2: Filter<string> = (_, value) =>
  value.length > 2
  `,
  },
  {
    fileName: 'app/actions.ts',
    code: `
export const doThis: Action<string> = action =>
  action()
    .filter(operations.isOnline)
    .filter(operations.isGreaterThan2)
  `,
  },
]
