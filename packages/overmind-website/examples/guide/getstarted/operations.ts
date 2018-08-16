export const js = [
  {
    fileName: 'operations.js',
    code: `
export const getPosts =
  ({ jsonPlaceholder }) => jsonPlaceholder.getPosts()
  `,
  },
]

export const ts = [
  {
    fileName: 'operations.ts',
    code: `
import { Effects } from './app'

export function getPosts ({ jsonPlaceholder }: Effects) {
  return jsonPlaceholder.getPosts()
}
  `,
  },
]
