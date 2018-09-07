export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/index.ts',
          code: `
import App, { TConnect } from 'overmind-${view}'
import queryString from 'query-string'
import * as page from 'page'
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

...

const app = new App(config)

function parseQuery (action) {
  return (context) {
    action({
      params: context.params,
      query: queryString.parse(context.querystring)
    })
  }
}

page('/', parseQuery(app.actions.showHomePage))
page('/users', parseQuery(app.actions.showUsersPage))
page('/users/:id', parseQuery(app.actions.showUserModal))

...
  `,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import App from 'overmind-${view}'
import queryString from 'query-string'
import page from 'page'
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

const app = new App({
  state,
  actions,
  effects
})

function parseQuery (action) {
  return (context) {
    action({
      params: context.params,
      query: queryString.parse(context.querystring)
    })
  }
}

page('/', parseQuery(app.actions.showHomePage))
page('/users', parseQuery(app.actions.showUsersPage))
page('/users/:id', parseQuery(app.actions.showUserModal))

...
`,
        },
      ]
