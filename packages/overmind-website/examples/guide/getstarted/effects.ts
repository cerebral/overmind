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
  }),
  effects: {
    jsonPlaceholder: {
      getPosts() {
        return fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
      }
    }
  }
})

export default app
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

export type Effects = {
  jsonPlaceholder: {
    getPosts(): Promise<Post[]>
  }
}

const effects: Effects = {
  jsonPlaceholder: {
    getPosts() {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
    }
  }
}

type Action = TAction<typeof state, typeof effects>

const actions = (action: Action) => ({
  loadPosts: action()
    .mutation(mutations.setLoadingPosts)
    .map(operations.getPosts)
    .mutation(mutations.setPosts)
    .mutation(mutations.unsetLoadingPosts)
})

const app = new App({
  state,
  actions,
  effects
})

export type Connect = TConnect<typeof app.state, typeof app.actions>

export default app
        `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
