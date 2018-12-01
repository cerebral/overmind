export default (ts) =>
  ts
    ? [
        {
          code: `
import { useEffect } from 'overmind-components'

const MyComponent: Component = () => {
  useEffect(() => {
    console.log('I run on every render')
  })

  return <h1>Hello</h1>
}
`,
        },
        {
          code: `
import { useEffect } from 'overmind-components'

const MyComponent: Component = () => {
  useEffect(() => {
    const onVisibilityChange = () => {
      console.log('I am registered once, and unregistered on component unmount')
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return <h1>Hello</h1>
}
`,
        },
        {
          code: `
import { useEffect } from 'overmind-components'

const MyComponent: Component = ({ state }) => {
  useEffect(() => {
    console.log('I run initially and whenever the title changes')
  }, [state.title])

  return <h1>Hello</h1>
}
`,
        },
      ]
    : [
        {
          code: `
import { useEffect } from 'overmind-components'

const MyComponent = () => {
useEffect(() => {
  console.log('I run on every render')
})

return <h1>Hello</h1>
}
`,
        },
        {
          code: `
import { useEffect } from 'overmind-components'

const MyComponent = () => {
useEffect(() => {
  const onVisibilityChange = () => {
    console.log('I am registered once, and unregistered on component unmount')
  }
  document.addEventListener('visibilitychange', onVisibilityChange)

  return () => {
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }
}, [])

return <h1>Hello</h1>
}
`,
        },
        {
          code: `
import { useEffect } from 'overmind-components'

const MyComponent = ({ state }) => {
useEffect(() => {
  console.log('I run initially and whenever the title changes')
}, [state.title])

return <h1>Hello</h1>
}
`,
        },
      ]
