export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, filter } from 'overmind'

const lengthGreaterThan: (length: number) => Operator<string> =
  (length) => filter((_, value) => value.length > length)
    
        `,
        },
      ]
    : [
        {
          fileName: 'overmind/operators.js',
          code: `
import { map, filter } from 'overmind'

export const lengthGreaterThan = (length) => filter((_, value) => value.length > length)
        `,
        },
      ]
