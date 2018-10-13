export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'
import page from 'page'

const onInitialize: OnInitialize = (app) => {
  const withParams = <T>(action: (payload: T) => any) => ({ params }) =>
    action(params)

  page('/', withParams(app.actions.showHomePage))
  page('/users', withParams(app.actions.showUsersPage))
  page('/users/:id', withParams<{
    id: string
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
  const withParams = (action) => ({ params }) => action(params)

  page('/', withParams(app.actions.showHomePage))
  page('/users', withParams(app.actions.showUsersPage))
  page('/users/:id', withParams(app.actions.showUserModal))
}
`,
        },
      ]
