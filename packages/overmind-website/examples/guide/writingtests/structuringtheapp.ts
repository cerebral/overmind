import { tsAppIndex } from '../../templates'

const javascript = {
  react: [
    {
      fileName: 'overmind/index.js',
      code: `
import { createHook } from 'overmind-react'

export const config = {
  state: {
    isLoadingPosts: false
  }
}

export const useOvermind = createHook()
`,
    },
    {
      fileName: 'index.js',
      code: `
import React from 'react'
import { render } from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import App from './components/App'

const overmind = createOvermind(config)

render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  document.querySelector('#app')
)
`,
    },
  ],
  vue: [
    {
      fileName: 'overmind/index.js',
      code: `
export const config = {
  state: {
    isLoadingPosts: false
  }
}
`,
    },
    {
      fileName: 'overmind/index.js',
      code: `
import Vue from 'vue'
import { createOvermind } from 'overmind'
import { createPlugin } from 'overmind-vue'
import { config } from './overmind'
import App from './components/App'

const overmind = createOvermind(config)

Vue.use(createPlugin(overmind))

new Vue({
  el: document.querySelector('#app'),
  render: h => h(App)
})
`,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'overmind/index.ts',
      code: `
import { IConfig } from 'overmind'
import { createHook } from 'overmind-react'
import { state } from './state'

export const config = {
  state
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()
`,
    },
    {
      fileName: 'index.ts',
      code: `
import * as React from 'react'
import { render } from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import { App } from './components/App'

const overmind = createOvermind(config)

render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  document.querySelector('#app')
)
`,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'overmind/index.ts',
      code: tsAppIndex(
        'angular',
        `
import { state } from './state'

export const config = {
  state,
}
`
      ),
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
