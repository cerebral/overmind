export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
...

export const overmindA = createOvermind(configA, {
  name: 'appA'
})

export const overmindB = createOvermind(configB, {
  name: 'appB'
})
        `,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
...

export const overmindA = createOvermind(configA, {
  name: 'appA'
})

export const overmindB = createOvermind(configB, {
  name: 'appB'
})
`,
        },
      ]
