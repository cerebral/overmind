import { Overmind, IConfig } from 'overmind'
import { merge, namespaced } from 'overmind/config'
import state from './state'
import onInitialize from './onInitialize'
import * as actions from './actions'
import * as effects from './effects'
import { createHook } from 'overmind-react'

const config = merge(
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

const app = new Overmind(
  config,
  process.env.NODE_ENV === 'production'
    ? {
        devtools: false,
      }
    : {}
)

export const useOvermind = createHook(app)
