export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/operations.ts',
          code: `
import { Operation } from 'overmind'

export const getUser: Operation.Map<string, Promise<User>> =
  ({ http, value: id }) => http.get(\`/users/\${id}\`)

export const trim: Operation.Map<string, string> =
  ({ value }) => value.trim()
  `,
        },
        {
          fileName: 'app/actions.ts',
          code: `
import { Action } from 'overmind'

export const doThis: Action<string> = action =>
  action
    .map(operations.trim)
    .map(operations.getUser)
  `,
        },
      ]
    : [
        {
          fileName: 'app/operations.js',
          code: `
export const getUser = ({ http, value: id }) =>
  http.get(\`/users/\${id}\`)

export const trim = (_, value) =>
  value.trim()
  `,
        },
        {
          fileName: 'app/actions.js',
          code: `
export const doThis = action =>
  action
    .map(operations.trim)
    .map(operations.getUser)
  `,
        },
      ]
