export const js = [
  {
    fileName: 'app/actions.js',
    code: `
import * as operations from './operations'

export const loadApplication = action =>
    action()

export const getValidToken = action =>
    action()

export const initializeApp = action =>
  action()
    .when(operations.hasValidToken, {
      true: loadApplication(action),
      false: getValidToken(action).compose(loadApplication(action))
    })
  `,
  },
]

export const ts = [
  {
    fileName: 'app/actions.ts',
    code: `
import { Action } from './'
import * as operations from './operations'

export const loadApplication: Action = action =>
    action()

export const getValidToken: Action = action =>
    action()

export const initializeApp: Action = action =>
  action()
    .when(operations.hasValidToken, {
      true: loadApplication(action),
      false: getValidToken(action).compose(loadApplication(action))
    })
  `,
  },
]
