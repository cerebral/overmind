export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
          code: `
export type User = {
  id: number
  firstName: string
  lastName: string
  fullName: string
}

export type State = {
  user: User
}

export const state: State = {
  user: {
    id: 1,
    firstName: 'Bob',
    lastName: 'Jackson',
    get fullName(this: User) {
      return this.firstName + ' ' + this.lastName
    }
  }
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/state.js',
          code: `
export const state = {
  user: {
    id: 1,
    firstName: 'Bob',
    lastName: 'Jackson',
    get fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}
  `,
        },
      ]
