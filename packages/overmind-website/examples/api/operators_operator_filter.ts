export default (ts) =>
  ts
    ? [
        {
          fileName: 'operators.ts',
          code: `
import { Operator, filter } from 'overmind'

export const lengthGreaterThan: (length: number) => Operator<string> = (length) =>
  filter(function lengthGreaterThan(_, value) {
    return value.length > length
  })
`,
        },
      ]
    : [
        {
          fileName: 'operators.js',
          code: `
import { filter } from 'overmind'

export const lengthGreaterThan = (length) =>
  filter(function lengthGreaterThan(_, value) {
    return value.length > length
  })
`,
        },
      ]
