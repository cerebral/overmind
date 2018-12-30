export default (ts) =>
  ts
    ? [
        {
          code: `
overmind/
  posts/
    state.ts
    actions.ts
    effects.ts
    index.ts
  admin/
    state.ts
    actions.ts
    effects.ts
    index.ts
  index.ts
              `,
        },
      ]
    : [
        {
          code: `
overmind/
  posts/
    state.js
    actions.js
    effects.js
    index.js
  admin/
    state.js
    actions.js
    effects.js
    index.js
  index.js
            `,
        },
      ]
