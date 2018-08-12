export const js = [
  {
    code: `
action()
  .when(({ localStorage }) => localStorage.get('token'), {
    true: withTokenAction,
    false: withoutTokenAction
  })
  `,
  },
]

export const ts = js
