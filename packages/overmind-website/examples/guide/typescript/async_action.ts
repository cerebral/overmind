export default () => [
  {
    code: `
import { AsyncAction } from 'overmind'

export const noArgAction: AsyncAction = async (context, value) => {
  value // this becomes "void"
}

export const argAction: AsyncAction<string> = async (context, value) => {
  value // this becomes "string"
}

export const noArgWithReturnTypeAction: AsyncAction<void, string> = async (context, value) => {
  value // this becomes "void"

  return 'foo'
} // returns Promise<string>

export const argWithReturnTypeAction: AsyncAction<string, string> = (context, value) => {
  value // this becomes "string"

  return Promise.resolve(value + '!!!')
} // returns Promise<string>
        `,
  },
]
