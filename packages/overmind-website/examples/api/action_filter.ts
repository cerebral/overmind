export const js = [
  {
    code: `
action()
  .filter(({ connection }) => connection.isOnline())
  `,
  },
  {
    code: `
action()
  .filter((_, value) => value.length > 2)
  `,
  },
]

export const ts = [
  {
    code: `
action()
  .filter(({ connection }) => connection.isOnline())
  `,
  },
  {
    code: `
action<string>()
  .filter((_, value) => value.length > 2)
  `,
  },
]
