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
  const { reaction } = useOvermind()

  useEffect(() => {
    return reaction(
      ({ currentPage }) => currentPage,
      () => document.querySelector('#app').scrollTop = 0
    })
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
  const { reaction } = useOvermind()

  useEffect(() => {
    return reaction(
      ({ currentPage }) => currentPage,
      () => document.querySelector('#app').scrollTop = 0
    })
  }, [])

  return <div />
}

export default App
`,
        },
      ]
