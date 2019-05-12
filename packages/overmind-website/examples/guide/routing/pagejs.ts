export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = ({ actions, effects }) => {
  effects.router.initialize({
    '/': actions.showHomePage,
    '/users': actions.showUsersPage,
    '/users/:id', actions.showUserModal
  })
}

export default onInitialize
`,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
const onInitialize = ({ actions, effects }) => {
  effects.router.initialize({
    '/': actions.showHomePage,
    '/users': actions.showUsersPage,
    '/users/:id', actions.showUserModal
  })
}

export default onInitialize
`,
        },
      ]
