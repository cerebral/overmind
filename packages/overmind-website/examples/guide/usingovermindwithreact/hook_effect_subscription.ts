export default (ts) =>
  ts
    ? [
        {
          fileName: 'components/App.tsx',
          code: `
import * as React from 'react'
import { useEffect } from 'react'
import { useOvermind } from '../overmind'

const Todos: React.FunctionComponent = () => {
  const { state, addMutationListener } = useOvermind()

  useEffect(() => {
    const dispose = addMutationListener((mutation) => {
      if (mutation.path === 'currentPage') {
        document.querySelector('#app').scrollTop = 0
      }
    })

    return () => dispose()
  }, [])

  return <div />
}

export default Todos
`,
        },
      ]
    : [
        {
          fileName: 'components/App.jsx',
          code: `
import React, { useEffect } from 'react'
import { useOvermind } from '../overmind'

const App = () => {
  const { state, addMutationListener } = useOvermind()

  useEffect(() => {
    const dispose = addMutationListener((mutation) => {
      if (mutation.path === 'currentPage') {
        document.querySelector('#app').scrollTop = 0
      }
    })

    return () => dispose()
  }, [])

  return <div />
}

export default App
`,
        },
      ]
