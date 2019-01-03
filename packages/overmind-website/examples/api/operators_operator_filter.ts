export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, filter } from 'overmind'

export const lengthGreaterThan: (length: number) => Operator<string> =
  (length) => filter(({ value }) => value.length > length)
`,
        },
      ]
    : [
        {
          code: `
import { filter } from 'overmind'

export const lengthGreaterThan = (length) =>
  filter(({ value }) => value.length > length)
`,
        },
      ]
