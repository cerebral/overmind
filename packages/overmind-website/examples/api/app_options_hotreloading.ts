export default (ts) =>
  ts
    ? [
        {
          code: `
const overmind = createOvermind(config, {
  hotReloading: false
})
        `,
        },
      ]
    : [
        {
          code: `
const overmind = createOvermind(config, {
  hotReloading: false
})
`,
        },
      ]
