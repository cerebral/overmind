export const js = [
  {
    code: `
action()
  .mutation(state => state.isLoading = true)
  `,
  },
  {
    code: `
action()
  .mutation((state, value) => state.inputValue = value)
  `,
  },
]

export const ts = [
  {
    code: `
action()
  .mutation(state => state.isLoading = true)
  `,
  },
  {
    code: `
action<string>()
  .mutation((state, value) => state.inputValue = value)
  `,
  },
]
