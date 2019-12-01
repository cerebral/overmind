export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/dashboard/index.ts',
          code: `
import { Statechart, statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  state,
  actions
}

const issuesChart: Statechart<typeof config, {
  LOADING: void
  LIST: void
  ERROR: void
}> = {
  initial: 'LOADING',
  states: {
    LOADING: {
      entry: 'fetchIssues',
      exit: 'abortFetchIssues',
      on: {
        resolveIssues: 'LIST',
        rejectIssues: 'ERROR'
      }
    },
    LIST: {
      on: {
        toggleIssueCompleted: null
      }
    },
    ERROR: {
      on: {
        retry: 'LOADING'
      }
    },
  }
}

const projectsChart: Statechart<typeof config, {
  LOADING: void
  LIST: void
  ERROR: void
}> = {
  initial: 'LOADING',
  states: {
    LOADING: {
      entry: 'fetchProjects',
      exit: 'abortFetchProjects',
      on: {
        resolveIssues: 'LIST',
        rejectIssues: 'ERROR'
      }
    },
    LIST: {
      on: {
        expandAttendees: null
      }
    },
    ERROR: {
      on: {
        retry: 'LOADING'
      }
    },
  }
}

const dashboardChart: Statechart<typeof config, {
  ISSUES: {
    issues: typeof issuesChart
  }
  PROJECTS: {
    projects: typeof projectsChart
  }
}> = {
  initial: 'ISSUES',
  states: {
    ISSUES: {
      on: {
        openProjects: 'PROJECTS'
      },
      charts: { issuesChart }
    },
    PROJECTS: {
      on: {
        openIssues: 'ISSUES'
      },
      charts: { projectsChart }
    }
  }
}

export default statecharts(config, {
  dashboard: dashboardChart
})
`,
        },
      ]
    : [
        {
          fileName: 'overmind/dashboard/index.ts',
          code: `
import { statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  state,
  actions
}

const issuesChart = {
  initial: 'LOADING',
  states: {
    LOADING: {
      entry: 'fetchIssues',
      exit: 'abortFetchIssues',
      on: {
        resolveIssues: 'LIST',
        rejectIssues: 'ERROR'
      }
    },
    LIST: {
      on: {
        toggleIssueCompleted: null
      }
    },
    ERROR: {
      on: {
        retry: 'LOADING'
      }
    },
  }
}


const projectsChart = {
  initial: 'LOADING',
  states: {
    LOADING: {
      entry: 'fetchProjects',
      exit: 'abortFetchProjects',
      on: {
        resolveIssues: 'LIST',
        rejectIssues: 'ERROR'
      }
    },
    LIST: {
      on: {
        expandAttendees: null
      }
    },
    ERROR: {
      on: {
        retry: 'LOADING'
      }
    },
  }
}

const dashboardChart = {
  initial: 'ISSUES',
  states: {
    ISSUES: {
      on: {
        openProjects: 'PROJECTS'
      },
      charts: { issuesChart }
    },
    PROJECTS: {
      on: {
        openIssues: 'ISSUES'
      },
      charts: { projectsChart }
    }
  }
}

export default statecharts(config, {
  dashboard: dashboardChart
})
`,
        },
      ]
