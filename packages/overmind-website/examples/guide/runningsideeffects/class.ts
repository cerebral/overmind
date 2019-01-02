export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import axios from 'axios'
import { User } from './state'

interface IRequest {
  get<T>(url: string): Promise<T>
}

export class Api {
  private baseUrl: string
  private request: IRequest
  constructor (baseUrl: string, request: IRequest) {
    this.baseUrl = baseUrl
    this.request = request
  }
  getCurrentUser(): Promise<User>  {
    return this.request.get(\`\${this.baseUrl}/user\`)
  }
}

export const api =
  new Api(IS_PRODUCTION ? '/api/v1' : 'http://localhost:4321', axios)
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/effects.js',
          code: `
import axios from 'axios'

export class Api {
  constructor (baseUrl, request) {
    this.baseUrl = baseUrl
    this.request = request
  }
  getUser() {
    return this.request.get(\`\${this.baseUrl}/user\`)
  }
}

export const http =
  new Api(IS_PRODUCTION ? '/api/v1' : 'http://localhost:4321', axios)
  `,
        },
      ]
