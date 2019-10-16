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
      entry: 'someActionName',
      exit: 'someOtherActionName'
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
import { statechart } from 'overmind/config'
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
      entry: 'someActionName',
      exit: 'someOtherActionName'
    },
    STATE_B: {}
  }
}

export default statechart(config, chart)
`,
        },
      ]
