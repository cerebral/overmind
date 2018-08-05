import App, { namespaces } from 'vue-overmind'
import * as tabs from './tabs'
import * as posts from './posts'
import * as users from './users'
import * as api from './api'

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
