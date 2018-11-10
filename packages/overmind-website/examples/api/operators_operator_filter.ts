export default (ts) =>
  ts
    ? [
        {
          code: `
import { filter } from 'overmind'

export const lengthGreaterThan = (length: number) =>
  filter<string>(({ value }) => value.length > length)
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
