export default (ts, view) =>
  ts
    ? [
        {
          code: `
state.login.matches({
  login: {
    LOGIN: true
  }
})
`,
        },
      ]
    : [
        {
          code: `
state.login.matches({
  login: {
    LOGIN: true
  }
})
`,
        },
      ]
