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

enum IssuesState {
  LOADING = 'LOADING',
  LIST = 'LIST',
  ERROR = 'ERROR'
}

const issuesChart: Statechart<typeof config, IssuesState> = {
  initial: IssuesState.LOADING,
  states: {
    [IssuesState.LOADING]: {
      entry: 'fetchIssues',
      exit: 'abortFetchIssues',
      on: {
        resolveIssues: IssuesState.LIST,
        rejectIssues: IssuesState.ERROR
      }
    },
    [IssuesState.LIST]: {
      on: {
        toggleIssueCompleted: null
      }
    },
    [IssuesState.ERROR]: {
      on: {
        retry: IssuesState.LOADING
      }
    },
  }
}

enum ProjectsState {
  LOADING = 'LOADING',
  LIST = 'LIST',
  ERROR = 'ERROR'
}

const projectsChart: Statechart<typeof config, ProjectsState> = {
  initial: ProjectsState.LOADING,
  states: {
    [ProjectsState.LOADING]: {
      entry: 'fetchProjects',
      exit: 'abortFetchProjects',
      on: {
        resolveIssues: ProjectsState.LIST,
        rejectIssues: ProjectsState.ERROR
      }
    },
    [ProjectsState.LIST]: {
      on: {
        expandAttendees: null
      }
    },
    [ProjectsState.ERROR]: {
      on: {
        retry: ProjectsState.LOADING
      }
    },
  }
}

enum DashboardState {
  ISSUES = 'ISSUES',
  PROJECTS = 'PROJECTS'
}

const dashboardChart: Statechart<typeof config, DashboardState> = {
  initial: DashboardState.ISSUES,
  states: {
    [DashboardState.ISSUES]: {
      on: {
        openProject: DashboardState.PROJECTS
      },
      ...issuesChart
    },
    [DashboardState.PROJECTS]: {
      on: {
        openIssues: DashboardState.ISSUES
      },
      ...projectsChart
    }
  }
}

export default statechart(config, dashboardChart)
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
        openProject: 'PROJECTS'
      },
      ...issuesChart
    },
    PROJECTS: {
      on: {
        openIssues: 'ISSUES'
      },
      ...projectsChart
    }
  }
}

export default statechart(config, dashboardChart)
`,
        },
      ]
