export default (ts) =>
  ts
    ? [
        {
          fileName: 'actions.ts',
          code: `
import { Operator, pipe } from 'overmind'
import { Item } from './state'
import * as o from './operators'

export const openItem: Operator<string, Item> = pipe(
  o.openItemsWhichIsAPipeOperator(),
  o.getItem()
)
`,
        },
      ]
    : [
        {
          fileName: 'actions.js',
          code: `
import { pipe } from 'overmind'
import * as o from './operators'

export const openItem = pipe(
  o.openItemsWhichIsAPipeOperator(),
  o.getItem()
)
`,
        },
      ]
