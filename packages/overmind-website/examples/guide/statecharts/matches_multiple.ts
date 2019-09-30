export default (ts, view) =>
  ts
    ? [
        {
          code: `
state.login.matches(DashboardState.ISSUES, IssuesState.LOADING)
`,
        },
      ]
    : [
        {
          code: `
state.login.matches('ISSUES', 'LOADING')
`,
        },
      ]
