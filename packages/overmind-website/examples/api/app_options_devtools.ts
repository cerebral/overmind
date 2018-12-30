export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
...

export const overmind = new Overmind(config, {
  devtools: 'localhost:3031'
})
        `,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
...

export const overmind = new Overmind(config, {
  devtools: 'localhost:3031'
})
`,
        },
      ]
