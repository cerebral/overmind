export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
...

export const overmind = new Overmind(config, {
  logProxies: false
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
  logProxies: false
})
`,
        },
      ]
