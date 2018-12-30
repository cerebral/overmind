export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/admin/state.ts',
          code: `
export type User = {
  username: string
  bio: string
}

export type Users = {
  [username: string]: User
}

export type State = {
  isLoadingUsers: boolean
  users: Users
}

export const state: State = {
  isLoadingUsers: false,
  users: {}
}
  `,
        },
        {
          fileName: 'overmind/issues/state.ts',
          code: `
export type Issue = {
  id: string
  username: string
  title: string
  description: string
}

export type Issues = {
  [id: string]: Issue
}

export enum SortKey = {
  Date = 'date',
  Title = 'title'
}

export enum SortDirection = {
  Asc = 'asc',
  Desc = 'desc'
}

export type Sorting {
  key: SortKey
  type: SortDirection
}

export type State = {
  isLoading: boolean
  issues: Issues
}

export const state: State = {
  isLoading: false,
  issues: {},
  sorting: {
    key: SortKey.Date,
    direction: SortDirection.Asc
  }
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/admin/state.js',
          code: `
export default {
  isLoadingUsers: false,
  users: {}
}
  `,
        },
        {
          fileName: 'overmind/issues/state.js',
          code: `
export default {
  isLoading: false,
  issues: {},
  sorting: {
    key: 'date',
    type: 'asc'
  }
}
  `,
        },
      ]
