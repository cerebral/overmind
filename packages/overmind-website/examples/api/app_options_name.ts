export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
...

export const overmindA = new Overmind(configA, {
  name: 'appA'
})

export const overmindB = new Overmind(configB, {
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

export const overmindA = new Overmind(configA, {
  name: 'appA'
})

export const overmindB = new Overmind(configB, {
  name: 'appB'
})
`,
        },
      ]
