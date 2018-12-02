export default (ts) =>
  ts
    ? [
        {
          code: `
import { h, Component, useOvermind } from 'overmind-components'

const MyComponent: Component = () => {
  const { state, actions } = useOvermind()

  return (
    <h1 onClick={actions.toggleShouting}>
      {state.isShouting ? 'HELLO' : 'hello'}
    </h1>
  )
}
`,
        },
      ]
    : [
        {
          code: `
import { h, useOvermind } from 'overmind-components'

const MyComponent = () => {
  const { state, actions } = useOvermind()

  return (
    <h1 onClick={actions.toggleShouting}>
      {state.isShouting ? 'HELLO' : 'hello'}
    </h1>
  )
}
`,
        },
      ]
