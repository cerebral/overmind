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

const chart: Statechart<typeof config, {}> = {}

export default statecharts(config, {
  chartId: chart
})
`,
        },
      ]
    : [
        {
          code: `
import { statecharts } from 'overmind/config'
import * as actions from './actions'
import { state } from './state'

const config = {
  actions,
  state
}

const chart = {}

export default statecharts(config, {
  chartId: chart
})
`,
        },
      ]
