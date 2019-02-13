export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import * as axios from 'axios'
import { User } from './state'

export const api = {
  async getCurrentUser() {
    const response = await axios.get<User>('/user')

    return response.data
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
  async getCurrentUser() {
    const response = await axios.get('/user')

    return response.data
  }
}
  `,
        },
      ]
