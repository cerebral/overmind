export const js = [
  {
    fileName: 'app/admin/state.js',
    code: `
export let isLoadingUsers = false

export const users = {}
  `,
  },
  {
    fileName: 'app/issues/state.js',
    code: `
export let isLoading = false

export const issues = {}

export const sorting = {
  key: "date",
  type: "asc"
}
  `,
  },
]

export const ts = [
  {
    fileName: 'app/admin/state.ts',
    code: `
export type User = {
  username: string
  bio: string
}

export let isLoadingUsers: boolean = false

export const users: { [username: string]: User } = {}
  `,
  },
  {
    fileName: 'app/issues/state.ts',
    code: `
export enum SortKey = {
  Date = 'date',
  Title = 'title'
}

export enum SortType = {
  Asc = 'asc',
  Desc = 'desc'
}

export let isLoading = false

export const issues = {}

export const sorting: { key: SortKey, type: SortType } = {
  key: SortKey.Date,
  type: SortType.Asc
}
  `,
  },
]
