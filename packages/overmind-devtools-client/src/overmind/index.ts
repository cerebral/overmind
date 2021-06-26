import { IContext } from 'overmind'
import {
  createStateHook,
  createActionsHook,
  createReactionHook,
} from 'overmind-react'

import * as actions from './actions'
import * as effects from './effects'
import state from './state'

export const config = {
  effects,
  actions,
  state,
}

export type Context = IContext<typeof config>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useReaction = createReactionHook<Context>()
