import { css } from 'emotion'
import * as React from 'react'
import SplitPane from 'react-split-pane'

import { useAppState, useActions } from '../../overmind'
import { nameToColor } from '../../overmind/utils'
import * as textStyles from '../../styles/text'
import ActionsTools from '../ActionsTools'
import Chart from '../Chart'
import * as styles from './styles'

const Charts: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()
  const chartKeys = Object.keys(state.currentApp.charts)

  return (
    <div className={styles.wrapper}>
      <ActionsTools />
      {state.currentChart ? (
        <div className={styles.columns}>
          <SplitPane
            split="vertical"
            minSize={100}
            defaultSize={state.chartsSplitSize}
            onChange={(size) => actions.updateChartsSplitSize(size)}
          >
            <div className={styles.listWrapper}>
              {chartKeys.map((path) => {
                return (
                  <div
                    className={css(
                      styles.chartItem,
                      state.currentApp.currentChartId === path &&
                        styles.selected
                    )}
                    key={path}
                    onClick={() => actions.selectChart(path)}
                  >
                    <span
                      className={styles.chartColor}
                      style={{
                        backgroundColor: nameToColor(path),
                      }}
                    />
                    <span className={textStyles.denseNormal}>
                      {path || '[ROOT]'}
                    </span>
                  </div>
                )
              })}
            </div>
            <Chart chart={state.currentChart} statePath={[]} />
          </SplitPane>
        </div>
      ) : (
        <div className={styles.centerWrapper}>
          <span className={textStyles.header}>no charts defined...</span>
        </div>
      )}
    </div>
  )
}

export default Charts
