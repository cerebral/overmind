import { injectGlobal } from 'emotion'
import { h, render } from 'overmind-components'
import * as iconFont from './icomoon.woff2'
import App from './components/App'
import app from './app'

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

render(app, <App />, document.querySelector('#overmind-app'))
