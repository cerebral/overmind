import * as React from 'react'
import { injectGlobal } from 'emotion'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { createRoot } from 'react-dom/client'

import Devtools from './components/Devtools'
import { config, useActions, useAppState } from './overmind'
import { css } from './theme'

injectGlobal`
  ${css}

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    height: 100%;
  }

  body {
    overflow: hidden;
    font-family: Nunito, 'helvetica neue';
    background-color: var(--colors-background);
    color: var(--colors-text);
    line-height: 24px;
  }
  
  #app {
    height: 100%;
  }
`

window.onerror = (_, _2, _3, _4, error) => {
  overmind.actions.setError(error.message)
}

const overmind = createOvermind(config, {
  devtools: false,
})

const container = document.createElement('div')
container.id = 'app'
document.body.appendChild(container)

const root = createRoot(container)

root.render(
  <Provider value={overmind}>
    <Devtools />
  </Provider>
)
