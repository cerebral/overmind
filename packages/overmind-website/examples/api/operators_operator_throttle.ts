export default (ts) =>
  ts
    ? [
        {
          fileName: 'actions.ts',
          code: `
import { Operator, pipe, throttle } from 'overmind'
import * as o from './operators'

export const onMouseDrag: Operator<string> = pipe(
  throttle(200),
  o.handleMouseDrag()
)
`,
        },
      ]
    : [
        {
          fileName: 'actions.js',
          code: `
import { pipe, throttle } from 'overmind'
import * as o from './operators'

export const onMouseDrag = pipe(
  throttle(200),
  o.handleMouseDrag()
)
`,
        },
      ]
