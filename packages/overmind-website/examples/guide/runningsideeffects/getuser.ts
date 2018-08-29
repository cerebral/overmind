export const js = [
  {
    fileName: 'app/operations.js',
    code: `
export const getUser = ({ http }) =>
    http.get('/user')
  `,
  },
]

export const ts = [
  {
    fileName: 'app/operations.ts',
    code: `
import { Operation } from 'overmind'
import { User } from './state'

export const getUser: Operation.Map<any, Promise<User>> = ({ http }) =>
    http.get<User>('/user')
  `,
  },
]
