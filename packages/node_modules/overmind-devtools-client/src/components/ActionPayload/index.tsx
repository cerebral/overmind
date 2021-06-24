import * as React from 'react'

import { useAppState, useActions, useReaction } from '../../overmind'
import { isValidJson } from '../../overmind/utils'
import { colors } from '../../theme'
import * as styles from './styles'

const ActionPayload: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()
  const reaction = useReaction()
  const input = React.useRef(null)

  React.useEffect(() => {
    reaction(
      () => state.currentApp.selectedActionQuery,
      () => setTimeout(() => input.current && input.current.focus())
    )
  }, [])

  const payload = state.currentApp.actionQueryPayload

  return (
    <div className={styles.wrapper}>
      <input
        ref={input}
        style={{
          borderColor:
            !payload || isValidJson(payload) ? 'transparent' : colors.red,
        }}
        disabled={
          !state.currentApp.selectedActionQuery || state.isExecutingAction
        }
        placeholder={
          state.currentApp.selectedActionQuery ? 'Add some payload...' : null
        }
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            actions.executeAction()
          }
        }}
        className={styles.input}
        value={payload}
        onChange={(event) =>
          actions.setActionQueryPayload(event.currentTarget.value)
        }
      />
    </div>
  )
}

export default ActionPayload
