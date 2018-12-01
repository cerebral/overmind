export default (ts) =>
  ts
    ? [
        {
          code: `
const MyComponent: Component = ({ state }) => <h1>{state.title}</h1>
`,
        },
      ]
    : [
        {
          code: `
const MyComponent = ({ state }) => <h1>{state.title}</h1>
`,
        },
      ]
