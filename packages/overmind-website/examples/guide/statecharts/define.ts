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
        login: 'AUTHENTICATING'
      }
    },
    AUTHENTICATING: {
      on: {
        resolveUser: 'AUTHENTICATED',
        rejectUser: 'ERROR'
      }
    },
    AUTHENTICATED: {
      on: {
        logout: 'LOGIN'
      }
    },
    ERROR: {
      on: {
        tryAgain: 'LOGIN'
      }
    }
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
          fileName: 'overmind/login/index.js',
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
        login: 'AUTHENTICATING'
      }
    },
    AUTHENTICATING: {
      on: {
        resolveUser: 'AUTHENTICATED',
        rejectUser: 'ERROR'
      }
    },
    AUTHENTICATED: {
      on: {
        logout: 'LOGIN'
      }
    },
    ERROR: {
      on: {
        tryAgain: 'LOGIN'
      }
    }
  }
}

export default statecharts(config, {
  login: loginChart
})
`,
        },
      ]
