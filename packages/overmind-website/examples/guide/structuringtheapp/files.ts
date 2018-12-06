export default (ts, view) =>
  ts
    ? [
        {
          code: `
app/
  state.ts
  actions.ts
  effects.ts
  index.ts
              `,
        },
      ]
    : [
        {
          code: `
app/
  state.js
  actions.js
  effects.js
  index.js
            `,
        },
      ]
