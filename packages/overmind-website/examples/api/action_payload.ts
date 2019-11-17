export default (ts) =>
  ts
    ? [
        {
          code: `
import { Action } from 'overmind'

export const setTitle: Action<string> = ({ state }, title) => {
  state.title = title
}
`,
        },
      ]
    : [
        {
          code: `
export const setTitle = ({ state }, title) => {
  state.title = title
}
`,
        },
      ]
