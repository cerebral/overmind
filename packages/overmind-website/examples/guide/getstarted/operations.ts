export const js = [
  {
    fileName: 'app/operations.js',
    code: `
export const getPosts =
  ({ jsonPlaceholder }) => jsonPlaceholder.getPosts()
  `,
  },
]

export const ts = [
  {
    fileName: 'app/operations.ts',
    code: `
import { Operation } from 'overmind'

export const getPosts: Operation.Map<any, Promise<Post[]>> = ({ jsonPlaceholder })
  jsonPlaceholder.getPosts()
  `,
  },
]
