export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
import axios from 'axios'
import { User, Item } from './state'

export const api = {
  async getUser(): Promise<User> {
    const response = await fetch('/user')

    return response.json()
  },
  async getItem(id: number): Promise<Item> {
    const response = await fetch(\`/items/\${id}\`)

    return response.json()
  }
}
  `,
        },
      ]
    : [
        {
          fileName: 'effects.js',
          code: `
import axios from 'axios'

export const api = {
  async getUser() {
    const response = await fetch('/user')

    return response.json()
  },
  async getItem(id) {
    const response = fetch(\`/items/\${id}\`)

    return response.json()
  }
}
  `,
        },
      ]
