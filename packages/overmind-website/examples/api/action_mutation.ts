export const js = [
  {
    fileName: 'mutations.js',
    code: `
export const setLoading = state =>
  state.isLoading = true

export const setInputValue = (state, value) =>
  state.inputValue = value
    `,
  },
  {
    fileName: 'actions.js',
    code: `
export const doThis = action =>
  action()
    .mutation(mutations.setLoading)
    .mutation(mutations.setInputValue)
  `,
  },
]

export const ts = [
  {
    fileName: 'mutations.ts',
    code: `
export const setLoading: Mutation = state =>
  state.isLoading = true

export const setInputValue: Mutation<string> = (state, value) =>
  state.inputValue = value
    `,
  },
  {
    fileName: 'actions.ts',
    code: `
export const doThis: Action<string> = action =>
  action<string>()
    .mutation(mutations.setLoading)
    .mutation(mutations.setInputValue)
  `,
  },
]
