import { css } from 'emotion'
import * as React from 'react'

import { useActions, useAppState } from '../../overmind'
import * as textStyles from '../../styles/text'
import Inspector, { RenderPaths } from '../Inspector'
import * as styles from './styles'

const DerivedWrapper: React.FunctionComponent = ({ children }) => (
  <div className={styles.label}>
    <div className={styles.labelWrapper}>
      <div className={styles.derivedLabel}>
        <span className={css(textStyles.hint, textStyles.monospace)}>
          derived
        </span>
      </div>
    </div>
    <div>{children}</div>
  </div>
)

const State: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.keyCode === 27) {
        actions.undoSettingState()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className={styles.wrapper} onClick={() => actions.undoSettingState()}>
      <div className={styles.edit}>
        Hold CMD/CTRL and click a key to edit the state value
      </div>
      <Inspector
        delimiter={state.currentApp.delimiter}
        value={state.currentApp.state || {}}
        expandedPaths={state.currentApp.expandedStatePaths}
        onClickPath={actions.setState}
        onToggleExpand={actions.toggleExpandState}
        selectedStatePath={state.currentApp.selectedStatePath}
        onSubmitState={actions.submitState}
        renderPaths={
          Object.assign(
            {},
            Object.keys(state.currentApp.derived || {}).reduce(
              (aggr, key) =>
                Object.assign(aggr, {
                  [key]: (children) => (
                    <DerivedWrapper key={key}>{children}</DerivedWrapper>
                  ),
                }),
              {}
            )
          ) as RenderPaths
        }
      />
    </div>
  )
}

export default State
