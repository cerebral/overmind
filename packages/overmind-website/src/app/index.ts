import { Overmind, TConfig } from 'overmind'
import state from './state'
import onInitialize from './onInitialize'
import * as actions from './actions'
import * as effects from './effects'
import { createHook, createConnect, TConnect } from 'overmind-react'

const config = {
  onInitialize,
  state,
  actions,
  effects,
}

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

const app = new Overmind(
  config,
  process.env.NODE_ENV === 'production'
    ? {
        devtools: false,
      }
    : {}
)

export const useOvermind = createHook(app)
