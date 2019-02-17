import { tsAppIndex } from '../../templates'

const javascript = {
  react: [
    {
      fileName: 'server/routePosts.js',
      code: `
import { renderToString } from 'react-dom/server'
import { createOvermindSSR } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '../client/overmind'
import App from '../client/components/App'
import db from './db'

export default async (req, res) => {
  const overmind = createOvermindSSR(overmind)

  overmind.currentPage = 'posts'
  overmind.posts = await db.getPosts()

  const html = renderToString(
    <Provider value={overmind}>
      <App />
    </Provider>
  )

  res.send(\`
<html>
  <body>
    <div id="app">\${html}</div>
    <script>
      window.__OVERMIND_MUTATIONS = \${JSON.stringify(overmind.hydrate())}
    </script>
    <script src="/scripts/app.js"></script>
  </body>
</html>
\`)
}
`,
    },
  ],
  vue: [
    {
      fileName: 'server/routePosts.js',
      code: `
import Vue from 'vue'
import { createRenderer } from 'vue-server-renderer'
import { createOvermindSSR } from 'overmind'
import { createPlugin } from 'overmind-vue'
import { config } from '../client/overmind'
import App from '../client/components/App'
import db from './db'

const renderer = createRenderer()

export default async (req, res) => {
  const overmind = createOvermindSSR(overmind)
  const OvermindPlugin = createPlugin(overmind)
  const app = new Vue({
    render(h) {
      return h(App)
    }
  })

  Vue.use(OvermindPlugin)

  const app = 
  overmind.currentPage = 'posts'
  overmind.posts = await db.getPosts()

  OvermindPlugin.set(overmind)

  const html = await renderer.renderToString(app)

  res.send(\`
  <html>
    <body>
      <div id="app">\${html}</div>
      <script>
        window.__OVERMIND_MUTATIONS = \${JSON.stringify(overmind.hydrate())}
      </script>
      <script src="/scripts/app.js"></script>
    </body>
  </html>
  \`)
}
`,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'server/routePosts.ts',
      code: `
import { renderToString } from 'react-dom/server'
import { createOvermindSSR } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '../client/overmind'
import App from '../client/components/App'
import db from './db'

export default async (req, res) => {
  const overmind = createOvermindSSR(overmind)

  overmind.currentPage = 'posts'
  overmind.posts = await db.getPosts()

  const html = renderToString(
    <Provider value={overmind}>
      <App />
    </Provider>
  )

  res.send(\`
<html>
  <body>
    <div id="app">\${html}</div>
    <script>
      window.__OVERMIND_MUTATIONS = \${JSON.stringify(overmind.hydrate())}
    </script>
    <script src="/scripts/app.js"></script>
  </body>
</html>
\`)
}
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

const config = {
  state,
}
`
      ),
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
