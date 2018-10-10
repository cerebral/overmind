import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/index.ts',
          code: `
...

const app = new App(config, {
  devtools: 'localhost:3031'
})

export default app 
        `,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
...

const app = new App(config, {
  devtools: 'localhost:3031'
})

export default app
`,
        },
      ]
