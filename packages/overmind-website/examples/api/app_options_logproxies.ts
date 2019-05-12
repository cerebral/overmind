export default (ts) =>
  ts
    ? [
        {
          code: `
const overmind = createOvermind(config, {
  logProxies: false
})
        `,
        },
      ]
    : [
        {
          code: `
const overmind = createOvermind(config, {
  logProxies: false
})
`,
        },
      ]
