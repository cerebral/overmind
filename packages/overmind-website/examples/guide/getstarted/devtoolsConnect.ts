export const js = [
  {
    fileName: 'app.js',
    code: `
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
}, {
  devtools: 'localhost:1234'
})
  `,
  },
]

export const ts = [
  {
    fileName: 'app.ts',
    code: `
const app = new App({
  state,
  actions,
  effects
}, {
  devtools: 'localhost:1234'
})
  `,
  },
]
