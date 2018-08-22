import App from 'vue-overmind'
import * as tabs from './tabs'
import * as posts from './posts'
import * as users from './users'
import * as effects from './effects'

const app = new App(
  {
    effects,
    namespaces: {
      tabs,
      posts,
      users,
    },
  },
  {
    devtools: 'localhost:1234',
  }
)

export default app
