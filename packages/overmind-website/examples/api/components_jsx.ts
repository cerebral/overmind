export default (ts) =>
  ts
    ? [
        {
          code: `
const MyComponent: Component = () => h('h1', null, 'Hello')
`,
        },
      ]
    : [
        {
          code: `
const MyComponent = () => h('h1', null, 'Hello')
`,
        },
      ]
