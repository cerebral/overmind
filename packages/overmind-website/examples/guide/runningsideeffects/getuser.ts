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
import { Map } from './'
import { User } from './state'

export const getUser: Map<any, Promise<User>> = ({ http }) =>
    http.get<User>('/user')
  `,
  },
]
