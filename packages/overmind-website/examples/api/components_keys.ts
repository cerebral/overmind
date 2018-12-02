export default (ts) =>
  ts
    ? [
        {
          code: `
import { h, Component, useOvermind } from 'overmind-components'

const Items: Component = () => {
  const { state } = useOvermind()

  return (
    <ul>
      {state.items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
`,
        },
      ]
    : [
        {
          code: `
import { h, useOvermind } from 'overmind-components'

const Items = () => {
  const { state } = useOvermind()

  return (
    <ul>
      {state.items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
`,
        },
      ]
