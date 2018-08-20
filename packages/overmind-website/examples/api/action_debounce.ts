export const js = [
  {
    code: `
export const doThis = action =>
  action()
    .debounce(200)
  `,
  },
]

export const ts = [
  {
    code: `
export const doThis: Action = action =>
  action()
    .debounce(200)
  `,
  },
]
