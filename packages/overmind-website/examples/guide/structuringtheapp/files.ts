import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          code: `
app/
  state.ts
  actions.ts
  effects.ts
  reactions.ts
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
  reactions.js
  index.js
            `,
        },
      ]
