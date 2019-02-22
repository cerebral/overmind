export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
...

export const overmind = createOvermind(config, {
  devtools: true // 'localhost:3031'
})
        `,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
...

export const overmind = createOvermind(config, {
  devtools: true // 'localhost:3031'
})
`,
        },
      ]
