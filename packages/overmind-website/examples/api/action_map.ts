export const js = [
  {
    code: `
action()
  .map(({ http }, id) => http.get(\`/users/\${id}\`))
  `,
  },
  {
    code: `
action()
  .map((_, value) => value.trim())
  `,
  },
]

export const ts = [
  {
    code: `
action<number>()
  .map(({ http }, id) => http.get(\`/users/\${id}\`))
  `,
  },
  {
    code: `
action<string>()
  .map((_, value) => value.trim())
  `,
  },
]
