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

// This is the class we can create new instances of when testing
export class Api {
  request: IRequest
  options: IOptions
  constructor(request: IRequest, options: IOptions) {
    this.request = request
    this.options = options
  }
  async getPost(id: string): Promise<Post> {
    try {
      const response = await this.request.get(this.options.baseUrl + '/posts/' + id, {
        headers: {
          'Auth-Token': this.options.authToken
        }
      })

      return response.data
    } catch (error) {
      throw new Error('Could not grab post with id ' + id)
    }
  }
}

// We export the default instance that we actually use with our
// application
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

// This is the class we can create new instances of when testing
export class Api {
  constructor(request, options) {
    this.request = request
    this.options = options
  }
  async getPost(id) {
    try {
      const response = await this.request.get(this.options.baseUrl + '/posts/' + id, {
        headers: {
          'Auth-Token': this.options.authToken
        }
      })
      
      return response.data
    } catch (error) {
      throw new Error('Could not grab post with id ' + id)
    }
  }
}

// We export the default instance that we actually use with our
// application
export const api = new Api(axios, {
  authToken: '134981091031hfh31',
  baseUrl: '/api'
})
            `,
        },
      ]
