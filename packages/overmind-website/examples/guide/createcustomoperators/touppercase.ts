export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, createOperator } from 'overmind'

export function toUpperCase(): Operator<string> {
  return createOperator('toUpperCase', '', (err, context, value, next) => {
    if (err) next(err, value)
    else next(null, value.toUpperCase())
  })
}
`,
        },
        {
          code: `
import { Operator, pipe, action } from 'overmind'
import { toUpperCase } from './operators'

export const setUpperCaseTitle: Operator<string> = pipe(
  toUpperCase(),
  action(({ state }, title) => {
    state.title = title
  })
)
  `,
        },
      ]
    : [
        {
          code: `
import { createOperator } from 'overmind'

export function toUpperCase() {
  return createOperator('toUpperCase', '', (err, context, value, next) => {
    if (err) next(err, value)
    else next(null, value.toUpperCase())
  })
}
`,
        },
        {
          code: `
import { pipe, action } from 'overmind'
import { toUpperCase } from './operators'

export const setUpperCaseTitle = pipe(
  toUpperCase(),
  action(({ state }, title) => {
    state.title = title
  })
)
`,
        },
      ]
