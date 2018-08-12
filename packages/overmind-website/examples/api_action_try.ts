export const js = [
  {
    code: `
action()
  .try(({ http }) => http.get('/items'), {
    success: handleItemsAction,
    error: handleItemsErrorAction
  })
  `,
  },
]

export const ts = js
