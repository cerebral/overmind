export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/login/index.ts',
          code: `
import { Statechart, statechart } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  state,
  actions
}

enum LoginState {
  LOGIN = 'LOGIN',
  AUTHENTICATING = 'AUTHENTICATING',
  AUTHENTICATED = 'AUTHENTICATED',
  ERROR = 'ERROR'
}

const loginChart: Statechart<typeof config, LoginState> = {
  initial: LoginState.LOGIN,
  states: {
    [LoginState.LOGIN]: {
      on: {
        changeUsername: null,
        changePassword: null,
        login: {
          target: LoginState.AUTHENTICATING,
          condition: state => Boolean(state.username && state.password)
        }
      }
    },
    ...
  }
}

export default statechart(config, loginChart)
`,
        },
      ]
    : [
        {
          fileName: 'overmind/login/index.ts',
          code: `
import { statechart } from 'overmind/config'
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

export default statechart(config, loginChart)
`,
        },
      ]
