export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import * as axios from 'axios'
import { User } from './state'

export const api = {
  getCurrentUser() {
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

export const api = {
  getCurrentUser() {
    return axios.get('/user')
  }
}
  `,
        },
      ]
