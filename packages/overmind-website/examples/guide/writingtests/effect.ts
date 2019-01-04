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

interface IConfig {
  authToken: string
  baseUrl: string
}

export class Api {
  request: IRequest
  config: IConfig
  constructor(request: IRequest, config: IConfig) {
    this.request = request
    this.config = config
  }
  getPost(id: string): Promise<Post> {
    return this.request.get(this.config.baseUrl + '/posts/' + id, {
      headers: {
        'Auth-Token': this.config.authToken
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
  constructor(request, config) {
    this.request = request
    this.config = config
  }
  getPost(id) {
    return this.request.get(this.config.baseUrl + '/posts/' + id, {
      headers: {
        'Auth-Token': this.config.authToken
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
