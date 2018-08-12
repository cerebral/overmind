export const js = [
  {
    code: `
action()
  .fork(({ http }) => http.get('/currentuser/access'), {
    admin: adminAction,
    superuser: superuserAction,
    user: userAction
  })
  `,
  },
  {
    code: `
action()
  .fork((_, selection) => selection, {
    aSelection: aSelectionAction,
    bSelection: bSelectionAction,
    cSelection: cSelectionAction
  })
  `,
  },
]

export const ts = [
  {
    code: `
action()
  .fork(({ http }) => http.get('/currentuser/access'), {
    admin: adminAction,
    superuser: superuserAction,
    user: userAction
  })
  `,
  },
  {
    code: `
action<string>()
  .fork((_, selection) => selection, {
    aSelection: aSelectionAction,
    bSelection: bSelectionAction,
    cSelection: cSelectionAction
  })
  `,
  },
]
