import * as React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, injectGlobal } from './styled-components'
import theme from './theme'
import App from './components/App'

injectGlobal`
  html, body {
    margin: 0;
  }
  body {
    background-color: #133046;
    color: #FAFAFA;
    font-family: Helvetica Neue;
  }
`

const container = document.createElement('div')
document.body.appendChild(container)
render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  container
)
