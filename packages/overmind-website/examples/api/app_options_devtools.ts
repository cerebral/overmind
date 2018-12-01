export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/index.ts',
          code: `
...

export const app = new Overmind(config, {
  devtools: 'localhost:3031'
})
        `,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
...

export const app = new Overmind(config, {
  devtools: 'localhost:3031'
})
`,
        },
      ]
