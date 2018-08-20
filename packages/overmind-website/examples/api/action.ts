export const js = [
  {
    code: `
export const doThis = action => 
  action()
    .map(operations.getUser)
    .mutation(mutations.setUser)
  `,
  },
]

export const ts = [
  {
    code: `
export const doThis: Action<number> = action =>
  action<number>()
    .map(operations.getUser)
    .mutation(mutations.setUser)
  `,
  },
]
