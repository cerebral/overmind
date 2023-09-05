import * as React from 'react'
import { injectGlobal } from 'emotion'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { createRoot } from 'react-dom/client'

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


  .react-split {
    flex: 1;
    height: 100%;
    position: relative;
    width: 100%;
  }
  .react-split__pane {
    height: 100%;
    position: absolute;
    white-space: normal;
    width: 100%;
    overflow: hidden;
  }
  .react-split__sash {
    height: 100%;
    position: absolute;
    top: 0;
    transition: background-color 0.1s;
    width: 100%;
    z-index: 2;
  }
  .react-split__sash--disabled {
    pointer-events: none;
  }
  .react-split__sash--vertical {
    transition: opacity 0.5s ease;
    cursor: col-resize;
    background-color: var(--colors-border);
    opacity: 0.8;
  }
  .react-split__sash--horizontal {
    cursor: row-resize;
  }
  .react-split__sash-content {
    width: 100%;
    height: 100%;
  }
  .react-split__sash-content--active {
    background-color: #175ede;
  }
  .react-split--dragging.react-split--vertical {
    cursor: col-resize;
  }
  .react-split--dragging.react-split--horizontal {
    cursor: row-resize;
  }
  
  body.react-split--disabled {
    user-select: none;
  }
  
  .split-sash-content {
    width: 100%;
    height: 100%;
  }
  .split-sash-content.split-sash-content-vscode.split-sash-content-active {
    background-color: var(--colors-border);
    opacity: 1;
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
