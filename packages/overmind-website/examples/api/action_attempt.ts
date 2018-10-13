export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/operations.js',
          code: `
import { Operation } from 'overmind'

export const getItems: Operation.Attempt<Promise<Items>> = ({ effects }) =>
  effects.http.get('/items')
  `,
        },
        {
          fileName: 'app/actions.js',
          code: `
import { Action } from 'overmind'

export const handleItemsAction: Action = action => action

export const handleItemsErrorAction: Action = action => action

export const doThis: Action = action => 
  action
    .attempt(operations.getItems, {
      success: handleItemsAction,
      error: handleItemsErrorAction
    })
    `,
        },
      ]
    : [
        {
          fileName: 'app/operations.js',
          code: `
export const getItems = ({ effects }) =>
  effects.http.get('/items')
  `,
        },
        {
          fileName: 'app/actions.js',
          code: `
export const handleItemsAction = action => action

export const handleItemsErrorAction = action => action

export const doThis = action => 
  action
    .attempt(operations.getItems, {
      success: handleItemsAction,
      error: handleItemsErrorAction
    })
    `,
        },
      ]
