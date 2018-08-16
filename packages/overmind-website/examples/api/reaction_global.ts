export const js = [
  {
    code: `
reaction(
  state => state.todos,
  action().do(saveTodosToLocalStorage)
)
  `,
  },
]

export const ts = [
  {
    code: `
reaction(
  (state: State) => state.todos,
  action().do(saveTodosToLocalStorage)
)
  `,
  },
]
