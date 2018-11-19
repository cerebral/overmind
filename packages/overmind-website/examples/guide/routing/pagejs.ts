export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = ({ value: actions, router }) => {
  router.route('/', actions.showHomePage)
  router.route('/users', actions.showUsersPage)
  router.route<{ id: string }>('/users/:id', actions.showUserModal)
  router.start()
}

export default onInitialize
`,
        },
      ]
    : [
        {
          fileName: 'app/onInitialize.ts',
          code: `
const onInitialize = ({ value: actions, router }) => {
  router.route('/', actions.showHomePage)
  router.route('/users', actions.showUsersPage)
  router.route<{ id: string }>('/users/:id', actions.showUserModal)
  router.start()
}

export default onInitialize
`,
        },
      ]
