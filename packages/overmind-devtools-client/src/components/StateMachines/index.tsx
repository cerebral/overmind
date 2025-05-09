import * as React from 'react'
import SplitPane, { Pane } from '../common/SplitPane'
import { useAppState, useActions } from '../../overmind'
import * as styles from './styles'
import * as textStyles from '../../styles/text'
import StateMachinesList from '../StateMachinesList'
import StateMachineTransitions from '../StateMachineTransitions'
import StateMachineSelector from '../StateMachineSelector'

const StateMachines: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()
  const currentMachine = state.currentApp.selectedStateMachine
    ? state.currentApp.stateMachines[state.currentApp.selectedStateMachine]
    : state.currentApp.stateMachinesList.find(
        (machine) =>
          machine.instanceId === state.currentApp.currentStateMachineInstanceId
      )
  const supportTransitions =
    state.currentApp.provider.name === 'overmind' &&
    state.currentApp.provider.version

  return (
    <div className={styles.wrapper}>
      <StateMachineSelector />
      {currentMachine ? (
        <div className={styles.columns}>
          <SplitPane
            split="vertical"
            sizes={[state.stateMachinesSplitSize]}
            onChange={(size) => actions.updateStateMachineSplitSize(size[0])}
          >
            <Pane minSize={150}>
              <StateMachinesList />
            </Pane>
            <Pane>
              <StateMachineTransitions machine={currentMachine} />
            </Pane>
          </SplitPane>
        </div>
      ) : (
        <div className={styles.centerWrapper}>
          {supportTransitions ? (
            <span className={textStyles.header}>
              no state machine transitions recorded...
            </span>
          ) : (
            <span className={textStyles.title}>
              State machine transitions are not supported in this version of
              Overmind.
              <br />
              Please upgrade to Overmind 28.1.0+ to enable this feature.
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default StateMachines
