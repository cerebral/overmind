import { IConfig } from 'overmind'
import { statechart, Statechart } from 'overmind/config'
import { createHook } from 'overmind-react'

import * as actions from './actions'
import * as effects from './effects'
import onInitialize from './onInitialize'
import state from './state'

const conf = {
  onInitialize,
  state,
  actions,
  effects,
}

const nestedChart: Statechart<
  typeof config,
  {
    foo: void
  }
> = {
  initial: 'foo',
  states: {
    foo: {},
  },
}

const download: Statechart<
  typeof conf,
  {
    idle: {
      nested: typeof nestedChart
    }
    loading: void
    success: void
    error: void
  }
> = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        changeQuery: 'loading',
      },
      charts: {
        nested: nestedChart,
      },
    },
    loading: {},
    success: {},
    error: {},
  },
}

const upload: Statechart<
  typeof conf,
  {
    idle: void
    loading: void
    success: void
    error: void
  }
> = {
  initial: 'idle',
  states: {
    idle: {},
    loading: {},
    success: {},
    error: {},
  },
}

export const config = statechart(conf, {
  download,
  upload,
})

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()
