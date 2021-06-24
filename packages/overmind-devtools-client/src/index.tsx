import * as React from 'react'
import { injectGlobal } from 'emotion'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { render } from 'react-dom'

import Devtools from './components/Devtools'
import { config } from './overmind'
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

  .Resizer {
    background: var(--colors-background);
    opacity: .2;
    z-index: 1;
    box-sizing: border-box;
    background-clip: padding-box;
  }

 .Resizer:hover {
    transition: all 0.5s ease;
  }
  .Resizer.vertical {
    width: 5px;
    margin: 0 -5px;
    border-left: 2px solid var(--colors-border);
    border-right: 2px solid var(--colors-border);
    opacity: 0.8;
    cursor: col-resize;
  }

  .Resizer.vertical:hover {
    opacity: 1;
  }
  
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
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
render(
  <Provider value={overmind}>
    <Devtools />
  </Provider>,
  container
)
