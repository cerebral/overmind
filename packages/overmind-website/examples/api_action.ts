export const js = [
  {
    code: `
action()
  .map(effects.getUser)
  .mutation(mutations.setUser)
  `,
  },
]

export const ts = [
  {
    code: `
action<number>()
  .map(effects.getUser)
  .mutation(mutations.setUser)
  `,
  },
]
