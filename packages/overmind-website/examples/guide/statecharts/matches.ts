export default (ts, view) =>
  ts
    ? [
        {
          code: `
state.login.matches(LoginState.Login)
`,
        },
      ]
    : [
        {
          code: `
state.login.matches('LOGIN')
`,
        },
      ]
