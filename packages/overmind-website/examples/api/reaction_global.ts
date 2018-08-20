export const js = [
  {
    fileName: 'reactions.js',
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
    fileName: 'reactions.js',
    code: `
export const saveTodos: Reaction = (reaction, action) => reaction(
  state => state.todos,
  action().do(saveTodosToLocalStorage)
)
  `,
  },
]
