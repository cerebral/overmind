export const js = [
  {
    code: `
export axios from 'axios'
  `,
  },
  {
    code: `
export const api = {
  getUser() {
    return fetch('/user').then(response => response.json())
  },
  getItem(id) {
    return fetch(\`/items/\${id}\`).then(response => response.json())
  }
}
  `,
  },
]

export const ts = [
  {
    code: `
export axios from 'axios'
  `,
  },
  {
    code: `
export const api = {
  getUser(): Promise<User> {
    return fetch('/user').then(response => response.json())
  },
  getItem(id: number): Promise<Item> {
    return fetch(\`/items/\${id}\`).then(response => response.json())
  }
}
  `,
  },
]
