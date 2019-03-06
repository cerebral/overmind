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

module.exports = async (req, res) => {
  const overmind = createOvermindSSR(config)

  overmind.state.currentPage = 'posts'
  overmind.state.posts = await db.getPosts()

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
/*
  VUE will not be able to support server side rendering until version 3.0

  "
    Top level APIs will likely receive an overhaul to avoid globally mutating the
    Vue runtime when installing plugins. Instead, plugins will be applied and scoped
    to a component tree. This will make it easier to test components that rely on
    specific plugins, and also make it possible to mount multiple Vue applications
    on the same page with different plugins, but using the same Vue runtime
  "
*/
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
  const overmind = createOvermindSSR(config)

  overmind.state.currentPage = 'posts'
  overmind.state.posts = await db.getPosts()

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
      code: `
import { IConfig } from 'overmind'
import { OvermindService } from 'overmind-angular'
import { Injectable } from '@angular/core'
import { state } from './state'

export const config = {
  state
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

@Injectable()
export class Store extends OvermindService<typeof config> {}
`,
    },
    {
      fileName: 'common.module.ts',
      code: `
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { OvermindService, OvermindModule } from 'overmind-angular'
import { AppComponent } from './components/app.component.ts'
import { Store } from './overmind'

// We create a shared module between the client and the server
@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    OvermindModule
  ],
  providers: [{ provide: Store, useExisting: OvermindService }]
})
export class CommonModule {}
`,
    },
    {
      fileName: 'app.module.ts',
      code: `
import { createOvermind } from 'overmind'
import { OVERMIND_INSTANCE } from 'overmind-angular'
import { CommonModule } from './common.module.ts'
import { config } from './overmind'

// The client specific module provides the Overmind instance
@NgModule({
  imports: [CommonModule],
  providers: [{
    provide: OVERMIND_INSTANCE,
    useValue: createOvermind(config)
  }]
})
export class AppModule {}
`,
    },
    {
      fileName: 'app.server.module.ts',
      code: `
import { ServerModule } from '@angular/platform-server';
import { CommonModule } from './common.module.ts'
import { config } from './overmind'

// The server module does not provide an instance, it is
// provider per request to the server
@NgModule({
  imports: [CommonModule, ServerModule],
})
export class AppServerModule {}
`,
    },
    {
      fileName: 'server/routePosts.js',
      code: `
import { renderModuleFactory } from '@angular/platform-server'
import { createOvermindSSR } from 'overmind'
import { config } from '../overmind'
import db from './db'

const { AppServerModuleNgFactory } = require('./server/main')

export default async (req, res) => {
  const overmind = createOvermindSSR(config)
  
  overmind.state.currentPage = 'posts'
  overmind.state.posts = await db.getPosts()

  const html = await renderModuleFactory(AppServerModuleNgFactory, {
    extraProviders: [{
      provide: OVERMIND_INSTANCE,
      useValue: overmind
    }]
  })

  res.send(\`
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      \${html}
      <script>
        window.__OVERMIND_MUTATIONS = \${JSON.stringify(overmind.hydrate())}
      </script>
      <script src="/scripts/app.js"></script>
    </body>
  </html>
\`)
});
`,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
