import App, { namespaces } from 'vue-overmind'
import * as tabs from './modules/tabs'
import * as posts from './modules/posts'
import * as users from './modules/users'
import * as api from './modules/api'

const namespaced = namespaces({
  tabs,
  posts,
  users,
  api,
})

const app = new App(namespaced, {
  devtools: 'localhost:1234',
})

export const connect = app.connect
