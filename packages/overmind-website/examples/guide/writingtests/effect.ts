export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import * as axios from 'axios'
import { Post } from './state'

interface IRequest {
  get<T>(url: string): Promise<T>
}

interface IOptions {
  authToken: string
  baseUrl: string
}

export class Api {
  request: IRequest
  options: IOptions
  constructor(request: IRequest, options: IOptions) {
    this.request = request
    this.options = options
  }
  getPost(id: string): Promise<Post> {
    return this.request.get(this.options.baseUrl + '/posts/' + id, {
      headers: {
        'Auth-Token': this.options.authToken
      }
    })
      .then(response => response.data)
      .catch(() => throw new Error('Could not grab post with id ' + id))
  }
}

export const api = new Api(axios, {
  authToken: '134981091031hfh31',
  baseUrl: '/api'
})
              `,
        },
      ]
    : [
        {
          fileName: 'overmind/effects.js',
          code: `
import axios from 'axios'

export class Api {
  constructor(request, options) {
    this.request = request
    this.options = options
  }
  getPost(id) {
    return this.request.get(this.options.baseUrl + '/posts/' + id, {
      headers: {
        'Auth-Token': this.options.authToken
      }
    })
      .then(response => response.data)
  }
}

export const api = new Api(axios, {
  authToken: '134981091031hfh31',
  baseUrl: '/api'
})
            `,
        },
      ]
