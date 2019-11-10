export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/files/index.ts',
          code: `
import { Statechart, statechart } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  state,
  actions
}

enum UploadState {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

const uploadChart: Statechart<typeof config, UploadState> = {
  initial: UploadState.IDLE,
  states: {
    [UploadState.IDLE]: {
      on: {
        upload: UploadState.PENDING,
      }
    },
    [LoginState.PENDING]: {
      on: {
        resolveUpload: UploadState.SUCCESS,
        rejectUpload: UploadState.ERROR
      }
    },
    [LoginState.SUCCESS]: {
      on: {
        reset: UploadState.IDLE
      }
    },
    [LoginState.ERROR]: {
      on: {
        reset: UploadState.IDLE
      }
    }
  }
}

enum DownloadState {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

const downloadChart: Statechart<typeof config, DownloadState> = {
  initial: DownloadState.IDLE,
  states: {
    [DownloadState.IDLE]: {
      on: {
        download: DownloadState.PENDING,
      }
    },
    [DownloadState.PENDING]: {
      on: {
        resolveDownload: DownloadState.SUCCESS,
        rejectDownload: DownloadState.ERROR
      }
    },
    [DownloadState.SUCCESS]: {
      on: {
        reset: DownloadState.IDLE
      }
    },
    [DownloadState.ERROR]: {
      on: {
        reset: DownloadState.IDLE
      }
    }
  }
}

export default statechart(config, [
  uploadChart,
  downloadChart
])
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

export default statechart(config, loginChart)
`,
        },
      ]
