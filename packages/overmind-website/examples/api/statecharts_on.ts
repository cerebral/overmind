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
    STATE_A: {
      on: {
        // Allow execution, but stay on this transition state
        someAction: null,
        
        // Move to new transition state when executed
        someOtherAction: 'STATE_B',

        // Conditionally move to a new transition state
        someConditionalAction: {
          target: 'STATE_B',
          condition: state => state.isTrue
        }
      }
    },
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
import { Statechart, statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  actions,
  state
}

const chart = {
  initial: 'STATE_A',
  states: {
    STATE_A: {
      on: {
        // Allow execution, but stay on this transition state
        someAction: null,
        
        // Move to new transition state when executed
        someOtherAction: 'STATE_B',

        // Conditionally move to a new transition state
        someConditionalAction: {
          target: 'STATE_B',
          condition: state => state.isTrue
        }
      }
    },
    STATE_B: {}
  }
}

export default statecharts(config, {
  chartId: chart
})
`,
        },
      ]
