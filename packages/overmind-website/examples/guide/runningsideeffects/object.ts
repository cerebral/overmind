export const js = [
  {
    fileName: 'app/effects.js',
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

export const ts = [
  {
    fileName: 'app/effects.ts',
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
