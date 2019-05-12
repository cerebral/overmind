export default () => [
  {
    code: `
import { Operator, mutate } from 'overmind'

export const doThis: () => Operator<string, number> = () => 
  mutate(function doThis() {
    
  })
    `,
  },
]
