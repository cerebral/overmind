export default () => [
  {
    code: `
import { Action } from 'overmind'

export const noArgAction: Action = ({ value }) => {
  value // this becomes "void"
}

export const argAction: Action<string> = ({ value }) => {
  value // this becomes "string"
}
        `,
  },
]
