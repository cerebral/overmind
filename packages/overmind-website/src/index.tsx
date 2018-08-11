import * as React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from './styled-components'
import * as iconFont from './icomoon.woff2'
import App from './components/App'

declare global {
  interface Window {
    rerender: () => void
  }
}

injectGlobal`
  @font-face {
    font-family: 'icomoon';
    src: url('${iconFont}') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`

render(<App />, document.querySelector('#overmind-app'))

window.rerender = () => render(<App />, document.querySelector('#overmind-app'))
