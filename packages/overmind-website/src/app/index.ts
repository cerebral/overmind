import { Overmind, TConfig } from 'overmind'
import state from './state'
import onInitialize from './onInitialize'
import * as actions from './actions'
import * as effects from './effects'

const config = {
  onInitialize,
  state,
  actions,
  effects,
}

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

export default new Overmind(config)
