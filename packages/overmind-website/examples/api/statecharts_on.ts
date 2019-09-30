export default (ts) =>
  ts
    ? [
        {
          code: `
import { Statechart, statechart } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  actions,
  state
}

enum States {
  STATE_A = 'STATE_A',
  STATEA_B = 'STATE_B'
}

const chart: Statechart<typeof config, States> = {
  initial: States.STATE_A,
  states: {
    [States.STATE_A]: {
      on: {
        // Allow execution, but stay on this transition state
        someAction: null,
        
        // Move to new transition state when executed
        someOtherAction: States.STATE_B,

        // Conditionally move to a new transition state
        someConditionalAction: {
          target: States.STATE_B,
          condition: state => state.isTrue
        }
      }
    },
    [States.STATE_B]: {}
  }
}

export default statechart(config, chart)
`,
        },
      ]
    : [
        {
          code: `
import { Statechart, statechart } from 'overmind/config'
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

export default statechart(config, chart)
`,
        },
      ]
