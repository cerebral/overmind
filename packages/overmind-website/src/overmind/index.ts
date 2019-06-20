import { IConfig } from 'overmind'
import { merge, namespaced } from 'overmind/config'
import state from './state'
import onInitialize from './onInitialize'
import * as actions from './actions'
import * as effects from './effects'
import { createHook } from 'overmind-react'

export const config = merge(
  {
    onInitialize,
    state,
    actions,
    effects,
  },
  namespaced({
    foo: {
      actions: {
        foo: () => {},
      },
    },
  })
)

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()
