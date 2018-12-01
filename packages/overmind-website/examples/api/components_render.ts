export default (ts) =>
  ts
    ? [
        {
          code: `
import { h, render } from 'overmind-components'
import AppComponent from './components/App'
import app from './app'

render(app, <AppComponent />, document.querySelector('#app'))
`,
        },
      ]
    : [
        {
          code: `
import { h, render } from 'overmind-components'
import AppComponent from './components/App'
import app from './app'

render(app, <AppComponent />, document.querySelector('#app'))
`,
        },
      ]
