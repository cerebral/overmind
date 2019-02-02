export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = ({ actions, effects }) => {
  effects.router.route('/', actions.showHomePage)
  effects.router.route('/users', actions.showUsersPage)
  effects.router.route<{ id: string }>('/users/:id', actions.showUserModal)
  effects.router.start()
}

export default onInitialize
`,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
const onInitialize = ({ actions, effects }) => {
  effects.router.route('/', actions.showHomePage)
  effects.router.route('/users', actions.showUsersPage)
  effects.router.route<{ id: string }>('/users/:id', actions.showUserModal)
  effects.router.start()
}

export default onInitialize
`,
        },
      ]
