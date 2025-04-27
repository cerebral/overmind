import * as React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useAppState, useActions } from '../../overmind'
import * as styles from './styles'
import { css } from 'emotion'
import { nameToColor } from '../../overmind/utils'

const StateMachinesList: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  return (
    <div className={styles.listWrapper}>
      {state.currentApp.stateMachinesList.length ? (
        <div
          className={styles.clearItems}
          onClick={() => actions.clearStateMachines()}
        >
          clear
          <FaChevronDown style={{ marginLeft: '0.25rem' }} />
        </div>
      ) : null}

      {state.currentApp.selectedStateMachine
        ? (() => {
            const machine =
              state.currentApp.stateMachines[
                state.currentApp.selectedStateMachine
              ]
            const count = machine.transitions.length
            return (
              <div
                key={`${machine.id}`}
                className={css(styles.item, styles.selectedItem)}
              >
                <div
                  className={styles.indicator}
                  style={{
                    backgroundColor: nameToColor(machine.path),
                  }}
                />
                <div className={styles.itemName} title={machine.path}>
                  {machine.path}
                </div>
                {count > 1 ? (
                  <div className={styles.itemCount}>{count}</div>
                ) : (
                  ''
                )}
              </div>
            )
          })()
        : state.currentApp.stateMachineInstances.map((instance) => {
            const machine = state.currentApp.stateMachinesList.find(
              (m) => m.instanceId === instance.instanceId
            )

            if (!machine) return null

            return (
              <div
                key={`${machine.id}-${machine.instanceId}`}
                className={css(
                  styles.item,
                  state.currentApp.currentStateMachineInstanceId ===
                    machine.instanceId && styles.selectedItem
                )}
                onClick={() =>
                  actions.selectStateMachineInstance(machine.instanceId)
                }
              >
                <div
                  className={styles.indicator}
                  style={{
                    backgroundColor: nameToColor(machine.path),
                  }}
                />
                <div className={styles.itemName} title={machine.path}>
                  {machine.path}
                </div>
                {instance.count > 1 ? (
                  <div className={styles.itemCount}>{instance.count}</div>
                ) : (
                  ''
                )}
              </div>
            )
          })}
    </div>
  )
}

export default StateMachinesList
