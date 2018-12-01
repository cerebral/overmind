export default (ts) =>
  ts
    ? [
        {
          code: `
const MyComponent: Component = () => <h1>Hello</h1>
`,
        },
      ]
    : [
        {
          code: `
const MyComponent = () => <h1>Hello</h1>
`,
        },
      ]
