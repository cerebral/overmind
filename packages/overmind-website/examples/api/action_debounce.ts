export default (ts) =>
  ts
    ? [
        {
          code: `
import { Action } from 'overmind'

export const doThis: Action = action =>
  action()
    .debounce(200)
  `,
        },
      ]
    : [
        {
          code: `
export const doThis = action =>
  action()
    .debounce(200)
  `,
        },
      ]
