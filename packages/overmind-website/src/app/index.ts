import { Overmind, TConfig } from 'overmind'
import { TComponent } from 'overmind-components'
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

const app = new Overmind(config)

export type Component<Props = {}, Children = any> = TComponent<
  typeof app,
  Props,
  Children
>

export default app
