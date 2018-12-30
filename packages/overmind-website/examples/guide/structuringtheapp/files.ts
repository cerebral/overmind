export default (ts, view) =>
  ts
    ? [
        {
          code: `
overmind/
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
overmind/
  state.js
  actions.js
  effects.js
  index.js
            `,
        },
      ]
