export default (ts) =>
  ts
    ? [
        {
          code: `
app/
  posts/
    state.ts
    actions.ts
    effects.ts
    reactions.ts
    index.ts
  admin/
    state.ts
    actions.ts
    effects.ts
    reactions.ts
    index.ts
  index.ts
              `,
        },
      ]
    : [
        {
          code: `
app/
  posts/
    state.js
    actions.js
    effects.js
    reactions.js
    index.js
  admin/
    state.js
    actions.js
    effects.js
    reactions.js
    index.js
  index.js
            `,
        },
      ]
