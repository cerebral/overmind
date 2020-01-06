export default (ts, view) =>
  ts
    ? [
        {
          code: `
state.login.matches({
  LOGIN: true
})
`,
        },
      ]
    : [
        {
          code: `
state.login.matches({
  LOGIN: true
})
`,
        },
      ]
