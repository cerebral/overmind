export const js = [
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

export const ts = [
  {
    fileName: 'app/reactions.ts',
    code: `
export const saveTodos: Reaction = (reaction, action) => reaction(
  state => state.todos,
  action().do(saveTodosToLocalStorage)
)
  `,
  },
]
