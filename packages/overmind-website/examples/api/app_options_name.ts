export default (ts) =>
  ts
    ? [
        {
          code: `
const overmindA = createOvermind(configA, {
  name: 'appA'
})

const overmindB = createOvermind(configB, {
  name: 'appB'
})
        `,
        },
      ]
    : [
        {
          code: `
const overmindA = createOvermind(configA, {
  name: 'appA'
})

const overmindB = createOvermind(configB, {
  name: 'appB'
})
`,
        },
      ]
