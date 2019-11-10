import { IConfig } from 'overmind'
import { createHook } from 'overmind-react'

import * as actions from './actions'
import * as effects from './effects'
import onInitialize from './onInitialize'
import state from './state'

export const config = {
  onInitialize,
  state,
  actions,
  effects,
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()
