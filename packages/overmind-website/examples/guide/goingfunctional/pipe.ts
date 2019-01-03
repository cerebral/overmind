export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe } from 'overmind'

export const pipeA: Operator = pipe(
  operatorA,
  operatorB
)

export const pipeB: Operator = pipe(
  pipeA,
  operatorC,
  operatorD
)
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe } from 'overmind'

export const pipeA = pipe(
  operatorA,
  operatorB
)

export const pipeB = pipe(
  pipeA,
  operatorC,
  operatorD
)
  `,
        },
      ]
