import * as React from 'react'
import { useAppState, useActions } from '../../overmind'
import { getAppShortName, nameToColor } from '../../overmind/utils'
import * as styles from './styles'
import { css } from 'emotion'

const Apps: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  if (!state.currentApp) {
    return <div className={styles.wrapper}>N/A</div>
  }
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.currentApp(nameToColor(state.currentAppName))}
        onClick={actions.toggleShowApps}
      >
        {getAppShortName(state.currentAppName)}
      </div>
      {state.showApps ? (
        <>
          <div className={styles.overlay} onClick={actions.toggleShowApps} />
          <div className={styles.appsList}>
            {Object.keys(state.apps).map((appName) => (
              <div
                className={css(
                  styles.app,
                  state.currentAppName === appName && styles.appSelected
                )}
                key={appName}
                onClick={() => actions.selectApp(appName)}
              >
                {appName}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Apps
