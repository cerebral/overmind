export const js = [
  {
    fileName: 'main/operations.js',
    code: `
export const getPosts =
  ({ jsonPlaceholder }) => jsonPlaceholder.getPosts()
  `,
  },
]

export const ts = [
  {
    fileName: 'main/operations.ts',
    code: `
import { Map } from '../app'

export const getPosts: Map<any, Promise<Post[]>> = ({ jsonPlaceholder })
  jsonPlaceholder.getPosts()
  `,
  },
]
