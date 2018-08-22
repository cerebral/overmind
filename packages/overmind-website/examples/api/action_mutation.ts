export const js = [
  {
    fileName: 'app/mutations.js',
    code: `
export const setLoading = state =>
  state.isLoading = true

export const setInputValue = (state, value) =>
  state.inputValue = value
    `,
  },
  {
    fileName: 'app/actions.js',
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
    fileName: 'app/mutations.ts',
    code: `
export const setLoading: Mutation = state =>
  state.isLoading = true

export const setInputValue: Mutation<string> = (state, value) =>
  state.inputValue = value
    `,
  },
  {
    fileName: 'app/actions.ts',
    code: `
export const doThis: Action<string> = action =>
  action<string>()
    .mutation(mutations.setLoading)
    .mutation(mutations.setInputValue)
  `,
  },
]
