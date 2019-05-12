export default (ts) =>
  ts
    ? [
        {
          code: `
const overmind = createOvermind(config, {
  devtools: true // 'localhost:3031'
})
        `,
        },
      ]
    : [
        {
          code: `
const overmind = createOvermind(config, {
  devtools: true // 'localhost:3031'
})
`,
        },
      ]
