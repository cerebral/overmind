export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, map, mutate } from 'overmind'

export const toNumber: () => Operator<string, number> = () =>
  map(function toNumber(_, value) { 
    return Number(value)
  })

export const setValue: () => Operator<string> = () =>
  mutate(function setValue({ state}, value) {
    state.value = value
  })
  `,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe } from 'overmind'
import * as o from './operators'

export const onValueChange: Operator<string, number> = pipe(
  o.toNumber(),
  o.setValue()
)
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/operators.js',
          code: `
import { map, mutate } from 'overmind'

export const toNumber = () =>
  map(function toNumber(_, value) {
    return Number(value)
  })

export const setValue = () =>
  mutate(function setValue({ state }, value) {
    state.value = value
  })
`,
        },
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe } from 'overmind'
import * as o from './operators'

export const setValue = pipe(
  o.toNumber(),
  o.setValue()
)
`,
        },
      ]
