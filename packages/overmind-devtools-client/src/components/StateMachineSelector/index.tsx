import * as React from 'react'
import * as styles from './styles'
import { useAppState, useActions } from '../../overmind'
import { nameToColor } from '../../overmind/utils'
import { css } from 'emotion'

const StateMachineSelector: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()
  const app = state.currentApp

  if (app.isQueryingMachine) {
    return (
      <div className={styles.selector}>
        <div className={styles.wrapper}>
          <div
            className={styles.indicator}
            style={{
              backgroundColor: app.machineQuerySuggestion
                ? nameToColor(app.machineQuerySuggestion)
                : 'transparent',
            }}
          />

          <div className={styles.inputWrapper}>
            <div
              className={css(
                styles.suggestion,
                app.machineQuery.length ? styles.inputActive : null
              )}
            >
              {app.machineQuerySuggestion}
            </div>
            <input
              autoFocus
              placeholder="Search for state machine..."
              onBlur={() => actions.toggleQueryingMachine()}
              className={css(
                styles.input,
                app.machineQuery.length ? styles.inputActive : null
              )}
              value={app.machineQuery}
              onChange={(event) =>
                actions.changeMachineQuery(event.currentTarget.value)
              }
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  actions.submitMachineQuery()
                }
              }}
            />
          </div>
          <div className={styles.resultWrapper}>
            <div
              key="allStateMachines"
              className={styles.result}
              onMouseDown={() => actions.selectStateMachine('')}
            >
              <div className={styles.indicator} />
              All State Machines
            </div>
            {Object.keys(app.stateMachines)
              .sort()
              .filter((path) => path.startsWith(app.machineQuery))
              .map((path) => (
                <div
                  key={path}
                  className={styles.result}
                  onMouseDown={() => actions.selectStateMachine(path)}
                >
                  <div
                    className={styles.indicator}
                    style={{
                      backgroundColor: nameToColor(path),
                    }}
                  />
                  {path}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.selector}>
      <div
        className={styles.wrapper}
        onClick={() => actions.toggleQueryingMachine()}
      >
        {app.selectedStateMachine ? (
          <>
            <div
              className={styles.indicator}
              style={{
                backgroundColor: nameToColor(app.selectedStateMachine),
              }}
            />
            <div className={styles.selectedMachine}>
              {app.selectedStateMachine}
            </div>
          </>
        ) : (
          <div className={styles.noSelectedMachine}>
            Click to select a state machine...
          </div>
        )}
      </div>
    </div>
  )
}

export default StateMachineSelector
