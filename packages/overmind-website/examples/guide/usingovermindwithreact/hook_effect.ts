export default (ts) =>
  ts
    ? [
        {
          fileName: 'components/App.tsx',
          code: `
import * as React from 'react'
import { useEffect } from 'react'
import { useOvermind } from '../overmind'

const App: React.FunctionComponent = () => {
  const { state } = useOvermind()

  useEffect(() => {
    document.querySelector('#app').scrollTop = 0
  }, [state.currentPage])

  return <div />
}

export default App
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
  const { state } = useOvermind()

  useEffect(() => {
    document.querySelector('#app').scrollTop = 0
  }, [state.currentPage])

  return <div />
}

export default App
`,
        },
      ]
