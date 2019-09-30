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

enum NestedStates {
  FOO = 'FOO',
  BAR = 'BAR'
}

const nestedChart: Statechart<typeof config, NestedStates> = {
  initial: NestedStates.FOO,
  states: {
    [NestedStates.FOO]: {
      on: {
        transitionToBar: NestedStates.BAR
      }
    },
    [NestedStates.BAR]: {
      on: {
        transitionToFoo: NestedStates.FOO 
      }
    }
  }
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
        transitionToStateB: States.STATE_B
      },
      chart: nestedChart
    },
    [States.STATE_B]: {
      on: {
        transitionToStateA: States.STATE_A
      }
    }
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


const nestedChart = {
  initial: 'FOO',
  states: {
    FOO: {
      on: {
        transitionToBar: 'BAR'
      }
    },
    BAR: {
      on: {
        transitionToFoo: 'FOO'
      }
    }
  }
}


const chart = {
  initial: 'STATE_A',
  states: {
    STATE_A: {
      on: {
        transitionToStateB: 'STATE_B'
      },
      chart: nestedChart
    },
    STATE_B: {
      on: {
        transitionToStateA: 'STATE_A'
      }
    }
  }
}

export default statechart(config, chart)
`,
        },
      ]
