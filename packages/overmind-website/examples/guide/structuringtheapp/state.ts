export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/posts/state.ts',
          code: `
export type Post = {
  id: number
  title: string
}

export type State = {
  posts: Post[]
}

export const state: State = {
  posts: []
}
`,
        },
        {
          fileName: 'overmind/admin/state.ts',
          code: `
export type User = {
  id: number
  name: string
}
          
export type State = {
  users: User[]
}

export const state: State = {
  users: []
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/posts/state.js',
          code: `
export const state = {
  posts: []
}
`,
        },
        {
          fileName: 'overmind/admin/state.js',
          code: `
export const state = {
  users: []
}
`,
        },
      ]
