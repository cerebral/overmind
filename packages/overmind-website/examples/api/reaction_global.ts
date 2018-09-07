export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/reactions.ts',
          code: `
import { Reaction } from 'overmind'

export const saveTodos: Reaction = (reaction, action) => reaction(
  state => state.todos,
  action().do(saveTodosToLocalStorage)
)
  `,
        },
      ]
    : [
        {
          fileName: 'app/reactions.js',
          code: `
export const saveTodos = (reaction, action) => reaction(
  state => state.todos,
  action().do(saveTodosToLocalStorage)
)
  `,
        },
      ]
