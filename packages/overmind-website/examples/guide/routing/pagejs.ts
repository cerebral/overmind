export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = ({ value: overmind, router }) => {
  router.route('/', overmind.actions.showHomePage)
  router.route('/users', overmind.actions.showUsersPage)
  router.route<{ id: string }>('/users/:id', overmind.actions.showUserModal)
  router.start()
}

export default onInitialize
`,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
const onInitialize = ({ value: overmind, router }) => {
  router.route('/', overmind.actions.showHomePage)
  router.route('/users', overmind.actions.showUsersPage)
  router.route<{ id: string }>('/users/:id', overmind.actions.showUserModal)
  router.start()
}

export default onInitialize
`,
        },
      ]
