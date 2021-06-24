import * as React from 'react'
import * as styles from './styles'
import { useAppState, useActions } from '../../overmind'
import { nameToColor } from '../../overmind/utils'
import { css } from 'emotion'

const ActionSelector: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()
  const app = state.currentApp

  if (app.isQueryingAction) {
    return (
      <div className={styles.wrapper}>
        <div
          className={styles.indicator}
          style={{
            backgroundColor: app.actionQuerySuggestion
              ? nameToColor(app.actionQuerySuggestion)
              : 'transparent',
          }}
        />

        <div className={styles.inputWrapper}>
          <div
            className={css(
              styles.suggestion,
              app.actionQuery.length ? styles.inputActive : null
            )}
          >
            {app.actionQuerySuggestion}
          </div>
          <input
            autoFocus
            placeholder="Search for action..."
            onBlur={() => actions.toggleQueryingAction()}
            className={css(
              styles.input,
              app.actionQuery.length ? styles.inputActive : null
            )}
            value={app.actionQuery}
            onChange={(event) =>
              actions.changeActionQuery(event.currentTarget.value)
            }
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                actions.submitQueryAction()
              }
            }}
          />
        </div>
        <div className={styles.resultWrapper}>
          {app.actionPaths
            .filter((path) => path.startsWith(app.actionQuery))
            .map((path) => (
              <div
                key={path}
                className={styles.result}
                onMouseDown={() => actions.selectQueryAction(path)}
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
    )
  }

  return (
    <div
      className={styles.wrapper}
      onClick={() => actions.toggleQueryingAction()}
    >
      {app.selectedActionQuery ? (
        <>
          <div
            className={styles.indicator}
            style={{
              backgroundColor: nameToColor(app.selectedActionQuery),
            }}
          />
          <div className={styles.selectedAction}>{app.selectedActionQuery}</div>
        </>
      ) : (
        <div className={styles.noSelectedAction}>
          Click to select an action...
        </div>
      )}
    </div>
  )
}

export default ActionSelector
