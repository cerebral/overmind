import * as React from 'react'
import { FaRocket } from 'react-icons/fa'

import { useActions, useAppState } from '../../overmind'
import { colors } from '../../theme'
import ActionPayload from '../ActionPayload'
import ActionSelector from '../ActionSelector'
import * as styles from './styles'

const ActionsTools: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  return (
    <form
      className={styles.wrapper}
      onSubmit={(event) => {
        event.preventDefault()
        actions.executeAction()
      }}
    >
      <ActionSelector />
      <ActionPayload />
      <div
        className={styles.button}
        onClick={state.isExecutingAction ? null : () => actions.executeAction()}
        style={{
          backgroundColor:
            !state.isExecutingAction && state.currentApp.selectedActionQuery
              ? colors.green
              : colors.highlight,
        }}
      >
        <FaRocket />
      </div>
    </form>
  )
}

export default ActionsTools
