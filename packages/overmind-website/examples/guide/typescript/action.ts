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
        `,
  },
]
