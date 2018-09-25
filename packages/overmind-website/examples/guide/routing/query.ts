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

const withParamsAndQuery = <T>(action: (payload: T) => any) => ({ params, querystring }) =>
  action(Object.assign({}, params, queryString.parse(querystring)))

page('/', withParamsAndQuery(app.actions.showHomePage))
page('/users', withParamsAndQuery(app.actions.showUsersPage))
page('/users/:id', withParamsAndQuery<{ id: string, tabIndex: string   }>(app.actions.showUserModal))

...
  `,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import App from 'overmind'
import createConnect from 'overmind-${view}'
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

const withParamsAndQuery = (action) => ({ params, querystring }) =>
  action(Object.assign({}, params, queryString.parse(querystring)))

page('/', withParamsAndQuery(app.actions.showHomePage))
page('/users', withParamsAndQuery(app.actions.showUsersPage))
page('/users/:id', withParamsAndQuery(app.actions.showUserModal))

...
`,
        },
      ]
