import { injectGlobal } from 'emotion'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { createElement } from 'react'
import { render } from 'react-dom'
import { setConfig } from 'react-hot-loader'

import App from './components/App'
import * as iconFont from './icomoon.woff2'
import { config } from './overmind'

const overmind = createOvermind(
  config,
  process.env.NODE_ENV === 'production'
    ? {
        devtools: false,
      }
    : {
        devtools: true,
      }
)

setConfig({
  ignoreSFC: true, // RHL will be __completely__ disabled for SFC
  pureRender: true, // RHL will not change render method
})

injectGlobal`
  @font-face {
    font-family: 'icomoon';
    src: url('${iconFont}') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  :root {
    --color-primary: #61dafb;

    --color-dark-1: hsl(206, 57%, 17%);
    --color-dark-2: hsl(206, 57%, 14%);
    --color-white-1: hsl(0, 0%, 98%);
    --color-white-2: hsl(0, 0%, 95%);
    --color-black-1: hsl(0, 0%, 20%);
    --color-black-2: hsl(0, 0%, 25%);
    --color-gray-1: hsl(0, 0%, 90%);
    --color-gray-2: hsl(0, 0%, 95%);

    --padding-1: 0.1rem;
    --padding-2: 0.25rem;
    --padding-3: 0.5rem;
    --padding-4: 1rem;
    --padding-5: 2rem;
    --padding-6: 3rem;

    --font-size-1: 10px;
    --font-size-2: 14px;
    --font-size-3: 16px;
    --font-size-4: 20px;
    --font-size-5: 22px;
    --font-size-6: 34px;

    --border-radius-1: 3px;
  }
`

render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  document.querySelector('#overmind-app')
)
