export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/operations.ts',
          code: `
import { App, Operation } from 'overmind'

export const initializeRouter: Operation.Run<App> = ({ router, value: app }) => {
  router.route('/', app.actions.showHomePage)
  router.route('/users', app.actions.showUsersPage)
  router.route<{ id: string }>('/users/:id', app.actions.showUserModal)
  router.start()
}             
`,
        },
        {
          fileName: 'app/onInitialize.ts',
          code: `
import { OnInitialize} from 'overmind'
import * as operations from './operations'

const onInitialize: OnInitialize = (action) => 
  action.run(operations.initializeRouter)

export default onInitialize
`,
        },
      ]
    : [
        {
          fileName: 'app/operations.js',
          code: `
export const initializeRouter = ({ router, value: app }) => {
  router.route('/', app.actions.showHomePage)
  router.route('/users', app.actions.showUsersPage)
  router.route('/users/:id', app.actions.showUserModal)
  router.start()
}             
`,
        },
        {
          fileName: 'app/onInitialize.ts',
          code: `
import * as operations from './operations'

const onInitialize = (action) => 
  action.run(operations.initializeRouter)

export default onInitialize
`,
        },
      ]
