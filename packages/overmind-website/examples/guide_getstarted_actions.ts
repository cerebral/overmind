function createJsCode(view) {
  return [
    {
      fileName: 'app.js',
      code: `
import App from '${view}'
import * as mutations from './mutations'
import * as operations from './operations'

const app = new App({
  state: {
    isLoadingPosts: false,
    posts: []
  },
  actions: action => ({
    loadPosts: action()
      .mutation(mutations.setLoadingPosts)
      .map(operations.getPosts)
      .mutation(mutations.setPosts)
      .mutation(mutations.unsetLoadingPosts)
  })
})

export const connect = app.connect
        `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app.ts',
      code: `
import App, { TConnect, TAction } from '${view}'
import * as mutations from './mutations'
import * as operations from './operations'

export type Post = {
  id: number
  title: string
  body: string
}

export type State = {
  isLoadingPosts: boolean
  posts: Post[]
}

const state: State = {
  isLoadingPosts: true,
  posts: []
}

type Action = TAction<typeof state>

const actions = (action: Action) => ({
  loadPosts: action()
    .mutation(mutations.setLoadingPosts)
    .map(operations.getPosts)
    .mutation(mutations.setPosts)
    .mutation(mutations.unsetLoadingPosts)
})

const app = new App({
  state,
  actions
})

export type Connect = TConnect<typeof app.state, typeof app.actions>

export const connect = app.connect
        `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
