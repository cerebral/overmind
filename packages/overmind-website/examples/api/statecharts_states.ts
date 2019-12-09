export default (ts) =>
  ts
    ? [
        {
          code: `
import { Statechart, statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  actions,
  state
}

const chart: Statechart<typeof config, {
  STATE_A: void
  STATE_B: void
}> = {
  initial: 'STATE_A',
  states: {
    STATE_A: {},
    STATE_B: {}
  }
}

export default statecharts(config, {
  chartId: chart
})
`,
        },
      ]
    : [
        {
          code: `
import { statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  actions,
  state
}

const chart = {
  initial: 'STATE_A',
  states: {
    STATE_A: {},
    STATE_B: {}
  }
}

export default statecharts(config, {
  chartId: chart
})
`,
        },
      ]
