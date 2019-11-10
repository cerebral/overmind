import { IConfig } from 'overmind'
import { createHook } from 'overmind-react'
import { merge, namespaced, statechart } from 'overmind/config'

import * as actions from './actions'
import * as effects from './effects'
import onInitialize from './onInitialize'
import state from './state'

const chart2 = {
  initial: 'baz',
  states: {
    baz: {},
    mip: {},
  },
}

const chart3 = {
  initial: 'emma',
  states: {
    emma: {},
    ragne: {},
  },
}

const chart = {
  initial: 'foo',
  states: {
    foo: {
      on: {
        closeSearch: 'bar',
      },
      chart: [chart2, chart3],
    },
    bar: {},
  },
}

export const config = statechart(
  {
    onInitialize,
    state,
    actions,
    effects,
  },
  [chart, chart2]
)

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()
