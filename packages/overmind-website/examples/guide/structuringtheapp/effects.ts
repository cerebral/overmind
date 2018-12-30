export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/posts/effects.ts',
          code: `
export const postsApi = {
  getPostsFromServer(): Promise<Post[]> {}
}
`,
        },
        {
          fileName: 'overmind/admin/effects.ts',
          code: `
export const adminApi = {
  getUsersFromServer(): Promise<User[]> {}
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/posts/effects.js',
          code: `
export const postsApi = {
  getPostsFromServer() {}
}
`,
        },
        {
          fileName: 'overmind/admin/effects.js',
          code: `
export const adminApi = {
  getUsersFromServer() {}
}
`,
        },
      ]
