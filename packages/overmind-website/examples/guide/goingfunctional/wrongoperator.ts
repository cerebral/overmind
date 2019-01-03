export default () => [
  {
    code: `
import { Operator, action } from 'overmind'

export const doThis: Operator<string, number> = action(() => {})
    `,
  },
]
