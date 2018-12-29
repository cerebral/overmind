export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/index.ts',
          code: `
...

export const app = new Overmind(config, {
  logProxies: false
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
  logProxies: false
})
`,
        },
      ]
