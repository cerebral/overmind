import { css } from 'emotion'
import * as React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { useAppState, useActions } from '../../overmind'
import { Chart, NestedChart } from '../../overmind/types'
import { nameToColor } from '../../overmind/utils'
import * as textStyles from '../../styles/text'
import * as styles from './styles'

type Props = {
  chart: Chart
  statePath: (string | number)[]
  nestedCharts?: {
    [id: string]: NestedChart
  }
}

const ChartComponent: React.FunctionComponent<Props> = ({
  chart,
  statePath,
  nestedCharts = chart.charts,
}) => {
  const [expandedIds, setExpandedIds] = React.useState([])
  const state = useAppState()
  const actions = useActions()

  const delimiter = state.currentApp.delimiter

  return (
    <div className={styles.outerWrapper}>
      {Object.keys(nestedCharts).map((chartId) => {
        const nestedChart = nestedCharts[chartId]
        const keys = expandedIds.includes(chartId)
          ? Object.keys(nestedChart.states)
          : Object.keys(nestedChart.states).filter((key) => {
              return chart.states.reduce((aggr, state) => {
                if (aggr) return true

                return state
                  .join(delimiter)
                  .startsWith(statePath.concat(chartId, key).join(delimiter))
              }, false)
            })

        return (
          <React.Fragment key={chartId}>
            <div
              className={styles.id}
              onClick={() => {
                setExpandedIds(
                  expandedIds.includes(chartId)
                    ? expandedIds.filter((id) => id !== chartId)
                    : expandedIds.concat(chartId)
                )
              }}
            >
              {expandedIds.includes(chartId) ? (
                <FaChevronDown />
              ) : (
                <FaChevronUp />
              )}{' '}
              {chartId}
            </div>
            <div className={styles.wrapper}>
              {keys.map((key) => {
                const isActiveState = chart.states.reduce((aggr, state) => {
                  if (aggr) return true

                  return state
                    .join(delimiter)
                    .startsWith(statePath.concat(chartId, key).join(delimiter))
                }, false)

                return (
                  <div key={key} className={styles.stateItem}>
                    <div className={styles.stateNameCell}>
                      <div
                        className={styles.stateName}
                        style={{
                          backgroundColor: isActiveState
                            ? nameToColor(chart.path.join(delimiter))
                            : null,
                        }}
                      >
                        <span className={textStyles.label}>{key}</span>
                      </div>
                    </div>
                    <div className={styles.stateLineCell}>
                      <div
                        className={styles.selectedLine}
                        style={{
                          backgroundColor: isActiveState
                            ? nameToColor(chart.path.join(delimiter))
                            : null,
                        }}
                      />
                    </div>
                    {nestedChart.states[key].entry ? (
                      <div className={styles.stateNameCell}>
                        <div
                          className={styles.stateAction}
                          style={{
                            borderColor: isActiveState
                              ? nameToColor(chart.path.join(delimiter))
                              : null,
                          }}
                        >
                          <span className={textStyles.normal}>
                            {nestedChart.states[key].entry}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.stateLineCell}>
                        <div
                          className={styles.selectedLine}
                          style={{
                            backgroundColor: isActiveState
                              ? nameToColor(chart.path.join(delimiter))
                              : null,
                          }}
                        />
                      </div>
                    )}
                    <div className={styles.stateLineCell}>
                      <div
                        className={styles.selectedLine}
                        style={{
                          backgroundColor: isActiveState
                            ? nameToColor(chart.path.join(delimiter))
                            : null,
                        }}
                      />
                    </div>
                    <div
                      className={styles.onCell}
                      style={{
                        borderColor: isActiveState
                          ? nameToColor(chart.path.join(delimiter))
                          : null,
                      }}
                    >
                      <div
                        className={styles.wrapper}
                        style={{ margin: 0, width: '100%' }}
                      >
                        {Object.keys(nestedChart.states[key].on || {}).map(
                          (onKey) => {
                            let target
                            if (nestedChart.states[key].on[onKey]) {
                              target =
                                // @ts-ignore
                                nestedChart.states[key].on[onKey].target ||
                                nestedChart.states[key].on[onKey]
                            }
                            return (
                              <div key={onKey} className={styles.stateItem}>
                                <div
                                  onClick={
                                    chart.actions[onKey]
                                      ? () =>
                                          actions.selectQueryAction(
                                            chart.path
                                              .concat(onKey)
                                              .join(delimiter)
                                          )
                                      : null
                                  }
                                  className={css(
                                    styles.stateNameCell,
                                    styles.onName,
                                    chart.actions[onKey] && styles.activeAction,
                                    chart.path.concat(onKey).join(delimiter) ===
                                      state.currentApp.selectedActionQuery &&
                                      styles.selectedAction
                                  )}
                                >
                                  <span className={textStyles.normal}>
                                    {onKey}
                                  </span>
                                </div>
                                <div className={styles.stateLineCell}>
                                  {target ? (
                                    <div className={styles.transitionLine} />
                                  ) : null}
                                </div>
                                <div className={styles.transitionCell}>
                                  {target}
                                </div>
                                <div className={styles.nestedRoomCell} />
                              </div>
                            )
                          }
                        )}
                        {nestedChart.states[key].charts ? (
                          <div className={styles.stateItem}>
                            <div className={styles.nestedChart}>
                              <ChartComponent
                                chart={chart}
                                statePath={statePath.concat(chartId, key)}
                                nestedCharts={nestedChart.states[key].charts}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {nestedChart.states[key].exit ? (
                      <div className={styles.stateLineCell}>
                        <div
                          className={styles.selectedLine}
                          style={{
                            backgroundColor: isActiveState
                              ? nameToColor(chart.path.join(delimiter))
                              : null,
                          }}
                        />
                      </div>
                    ) : (
                      <div className={styles.stateLineCell} />
                    )}
                    {nestedChart.states[key].exit ? (
                      <div className={styles.stateNameCell}>
                        <div
                          className={styles.stateAction}
                          style={{
                            borderColor: isActiveState
                              ? nameToColor(chart.path.join(delimiter))
                              : null,
                          }}
                        >
                          <span className={textStyles.normal}>
                            {nestedChart.states[key].exit}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.stateLineCell} />
                    )}
                  </div>
                )
              })}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default ChartComponent
