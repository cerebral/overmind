export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/index.ts',
          code: `
...
const app = new App(config, {
  devtools: 'localhost:1234'
})
...
      `,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
...
const app = new App({
  state,
  actions,
  effects
}, {
  devtools: 'localhost:1234'
})
...
      `,
        },
      ]
