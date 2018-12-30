export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import * as axios from 'axios'
import { User } from './state'

export const http = {
  getUser() {
    return axios.get<User>('/user')
  }
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/effects.js',
          code: `
import axios from 'axios'

export const http = {
  getUser() {
    return axios.get('/user')
  }
}
  `,
        },
      ]
