import * as React from 'react'
import SplitPane, { Pane } from 'split-pane-react'
import { useAppState, useActions } from '../../overmind'
import ActionsList from '../ActionsList'
import Action from '../Action'
import * as styles from './styles'
import * as textStyles from '../../styles/text'
import ActionsTools from '../ActionsTools'

const Actions: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  return (
    <div className={styles.wrapper}>
      <ActionsTools />
      {state.currentAction ? (
        <div className={styles.columns}>
          <SplitPane
            split="vertical"
            sizes={[state.actionsSplitSize]}
            onChange={(size) => actions.updateActionsSplitSize(size[0])}
          >
            <Pane minSize={100}>
              <ActionsList />
            </Pane>
            <Pane>
              <Action action={state.currentAction} />
            </Pane>
          </SplitPane>
        </div>
      ) : (
        <div className={styles.centerWrapper}>
          <span className={textStyles.header}>no actions triggered...</span>
        </div>
      )}
    </div>
  )
}

export default Actions
