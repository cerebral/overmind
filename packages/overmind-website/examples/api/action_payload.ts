export default (ts) =>
  ts
    ? [
        {
          code: `
import { Action } from 'overmind'

export const setTitle: Action<string> = async ({ state }, title) => {
  state.title = title
}
`,
        },
      ]
    : [
        {
          code: `
export const setTitle = async ({ state }, title) => {
  state.title = title
}
`,
        },
      ]
