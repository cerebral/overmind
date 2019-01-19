export default (ts) =>
  ts
    ? [
        {
          code: `
import { Action } from 'overmind'

export const changeTitle: Action<string> = ({ value: title, state }) => {
  state.title = title
}
`,
        },
        {
          code: `
import { Action } from 'overmind'

export const getItem: Action<number> = async ({ value: id, state, effects }) => {
  const item = await effects.api.getItem(id)
  state.items.push(item)
}
  `,
        },
      ]
    : [
        {
          code: `
export const changeTitle = ({ value: title, state }) => {
  state.title = title
}
`,
        },
        {
          code: `
export const getItem = async ({ value: id, state, effects }) => {
  const item = await effects.api.getItem(id)
  state.items.push(item)
}
  `,
        },
      ]
