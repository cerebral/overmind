export const js = [
  {
    fileName: 'app/effects.js',
    code: `
import axios from 'axios'

class Http {
  constructor (baseUrl, request) {
    this.baseUrl = baseUrl
    this.request = request
  }
  getUser() {
    return this.request.get(\`\${this.baseUrl}/user\`)
  }
}

export const http =
  new Http(IS_PRODUCTION ? '/api/v1' : 'http://localhost:4321', axios)
  `,
  },
]

export const ts = [
  {
    fileName: 'app/effects.ts',
    code: `
import axios from 'axios'
import { User } from './state'

interface IHttp {
  get<T>(url: string): Promise<T>
}

class Http {
  private baseUrl: string
  private request: IHttp
  constructor (baseUrl: string, request: IHttp) {
    this.baseUrl = baseUrl
    this.request = request
  }
  getUser(): Promise<User>  {
    return this.request.get(\`\${this.baseUrl}/user\`)
  }
}

export const http =
  new Http(IS_PRODUCTION ? '/api/v1' : 'http://localhost:4321', axios)
  `,
  },
]
