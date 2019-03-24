export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, createOperator, mutate } from 'overmind'

export const toUpperCase: () => Operator<string> = () => {
  return createOperator('toUpperCase', '', (err, context, value, next) => {
    if (err) next(err, value)
    else next(null, value.toUpperCase())
  })
}

export const setTitle: Operator<string> = mutate(({ state }, title) => {
  state.title = title
})
`,
        },
        {
          code: `
import { Operator, pipe } from 'overmind'
import { toUpperCase, setTitle } from './operators'

export const setUpperCaseTitle: Operator<string> = pipe(
  toUpperCase(),
  setTitle
)
  `,
        },
      ]
    : [
        {
          code: `
import { createOperator, mutate } from 'overmind'

export const toUpperCase = () => {
  return createOperator('toUpperCase', '', (err, context, value, next) => {
    if (err) next(err, value)
    else next(null, value.toUpperCase())
  })
}

export const setTitle = mutate(({ state }, title) => {
  state.title = title
})
`,
        },
        {
          code: `
import { pipe } from 'overmind'
import { toUpperCase } from './operators'

export const setUpperCaseTitle = pipe(
  toUpperCase(),
  setTitle
)
`,
        },
      ]
