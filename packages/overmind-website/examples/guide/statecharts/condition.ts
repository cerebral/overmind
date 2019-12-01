export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/login/index.ts',
          code: `
import { Statechart, statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  state,
  actions
}

const loginChart: Statechart<typeof config, {
  LOGIN: void
  AUTHENTICATING: void
  AUTHENTICATED: void
  ERROR: void
}> = {
  initial: 'LOGIN',
  states: {
    LOGIN: {
      on: {
        changeUsername: null,
        changePassword: null,
        login: {
          target: 'AUTHENTICATING',
          condition: state => Boolean(state.username && state.password)
        }
      }
    },
    ...
  }
}

export default statecharts(config, {
  login: loginChart
})
`,
        },
      ]
    : [
        {
          fileName: 'overmind/login/index.ts',
          code: `
import { statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  state,
  actions
}

const loginChart = {
  initial: 'LOGIN',
  states: {
    LOGIN: {
      on: {
        changeUsername: null,
        changePassword: null,
        login: {
          target: 'AUTHENTICATING',
          condition: state => Boolean(state.username && state.password)
        }
      }
    },
    ...
  }
}

export default statecharts(config, {
  login: loginChart
})
`,
        },
      ]
