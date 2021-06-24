import { css } from 'emotion'
import * as React from 'react'
import { FaChevronDown } from 'react-icons/fa'

import { useAppState, useActions } from '../../overmind'
import { ActionsListItemType } from '../../overmind/types'
import { nameToColor } from '../../overmind/utils'
import * as textStyles from '../../styles/text'
import * as styles from './styles'

const ActionsList: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  return (
    <div className={styles.wrapper}>
      {state.currentApp.actionsList.length ? (
        <div
          className={styles.clearItems}
          onClick={() => actions.clearActions()}
        >
          clear
          <FaChevronDown style={{ marginLeft: '0.25rem' }} />
        </div>
      ) : null}
      {state.currentApp.actionsList.map((item, index) => {
        if (item.type === ActionsListItemType.ACTION) {
          const action = state.currentApp.actions[item.id]
          const nextItem = state.currentApp.actionsList[index + 1]
          const nextAction =
            nextItem && nextItem.type === ActionsListItemType.ACTION
              ? state.currentApp.actions[nextItem.id]
              : null

          const actionResult = (
            <div
              className={css(
                styles.actionItem,
                state.currentApp.currentActionId === item.id && styles.selected
              )}
              key={item.id}
              onClick={() => actions.selectAction(item.id)}
            >
              <span
                className={styles.actionColor}
                style={{
                  backgroundColor: nameToColor(action.actionName),
                }}
              />
              <span className={textStyles.denseNormal}>
                {action.actionName}
              </span>
              <span
                className={styles.errorIndication}
                style={{
                  visibility: action.hasError ? 'visible' : 'hidden',
                }}
              />
            </div>
          )
          if (nextAction && action.time - nextAction.time >= 1000) {
            return (
              <React.Fragment key={item.id}>
                {actionResult}
                <div className={styles.separator} />
              </React.Fragment>
            )
          }

          return actionResult
        }
        const mainAction = state.currentApp.actions[item.actionIds[0]]
        const groupedActionIds = item.actionIds.slice(1)

        return (
          <div key={item.id}>
            <div
              className={css(
                styles.actionItem,
                state.currentApp.currentActionId === item.id && styles.selected
              )}
              onClick={() => actions.selectAction(item.id)}
            >
              <span
                className={styles.actionColor}
                style={{ backgroundColor: nameToColor(mainAction.actionName) }}
              />
              <span className={textStyles.denseNormal}>
                {mainAction.actionName} ( {groupedActionIds.length + 1} )
              </span>
            </div>
            {item.isCollapsed
              ? null
              : groupedActionIds.map((actionId) => {
                  const action = state.currentApp.actions[actionId]
                  return (
                    <div
                      className={css(
                        styles.actionSubItem,
                        state.currentApp.currentActionId === actionId &&
                          styles.selected
                      )}
                      key={actionId}
                      onClick={() => actions.selectAction(actionId)}
                    >
                      <span className={textStyles.description}>
                        {action.actionName}
                      </span>
                    </div>
                  )
                })}
          </div>
        )
      })}
    </div>
  )
}

export default ActionsList
