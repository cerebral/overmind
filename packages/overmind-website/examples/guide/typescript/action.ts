export default () => [
  {
    code: `
import { Action } from 'overmind'

export const noArgAction: Action = (context, value) => {
  value // this becomes "void"
}

export const argAction: Action<string> = (context, value) => {
  value // this becomes "string"
}

export const noArgWithReturnTypeAction: Action<void, string> = (context, value) => {
  value // this becomes "void"

  return 'foo'
}

export const argWithReturnTypeAction: Action<string, string> = (context, value) => {
  value // this becomes "string"

  return value + '!!!'
}
        `,
  },
]
