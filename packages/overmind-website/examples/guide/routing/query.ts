export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'
import page from 'page'
import queryString from 'query-string'

const onInitialize: OnInitialize = (app) => {
  const withParamsAndQuery = <T>(action: (payload: T) => any) => ({ params, querystring }) =>
    action(Object.assign({}, params, queryString.parse(querystring)))

  page('/', withParamsAndQuery(app.actions.showHomePage))
  page('/users', withParamsAndQuery(app.actions.showUsersPage))
  page('/users/:id', withParamsAndQuery<{
    id: string,
    tabIndex: number
  }>(app.actions.showUserModal))
}

export default onInitialize
`,
        },
      ]
    : [
        {
          fileName: 'app/onInitialize.js',
          code: `
import page from 'page'

export default (app) => {
  const withParamsAndQuery = (action) => ({ params, querystring }) =>
    action(Object.assign({}, params, queryString.parse(querystring)))

  page('/', withParamsAndQuery(app.actions.showHomePage))
  page('/users', withParamsAndQuery(app.actions.showUsersPage))
  page('/users/:id', withParamsAndQuery(app.actions.showUserModal))
}
`,
        },
      ]
