import { css } from 'emotion'
import * as React from 'react'
import {
  FaChrome,
  FaCode,
  FaCogs,
  FaDatabase,
  FaHistory,
  FaProjectDiagram,
  FaSave,
  FaTerminal,
} from 'react-icons/fa'

import { useAppState, useActions } from '../../overmind'
import { Tab } from '../../overmind/types'
import { colors } from '../../theme'
import Apps from '../Apps'
import Tooltip from '../common/Tooltip'
import RuntimeConfig from '../RuntimeConfig'
import * as styles from './styles'

const Tabs: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  function getRuntimeColor() {
    if (!state.currentApp) return colors.highlight
    if (state.currentApp.connectionState === 'disconnected') return colors.red
    if (state.currentApp.connectionState === 'pending') return colors.yellow

    return colors.green
  }

  return (
    <div className={styles.wrapper}>
      <Apps />
      <div className={styles.divider} />
      <div className={styles.runtimeWrapper}>
        <button
          className={css(styles.button, styles.activeButton)}
          onClick={() => actions.toggleRuntimeConfig()}
        >
          <FaChrome
            style={{
              color: getRuntimeColor(),
            }}
          />
        </button>
        {state.isShowingRuntime ? <RuntimeConfig /> : null}
      </div>
      <div className={styles.divider} />
      <Tooltip text="State">
        <button
          className={css(
            styles.button,
            state.currentApp &&
              state.currentTab === Tab.State &&
              styles.activeButton
          )}
          disabled={state.isConnecting}
          onClick={() => actions.changeTab(Tab.State)}
        >
          <FaDatabase />
        </button>
      </Tooltip>
      <Tooltip text="Actions">
        <div
          style={{ position: 'relative' }}
          className={css(styles.buttonWithCount)}
        >
          <button
            disabled={state.isConnecting}
            onClick={() => actions.changeTab(Tab.Actions)}
            style={{
              opacity:
                state.currentApp && state.currentTab === Tab.Actions ? 1 : null,
            }}
          >
            <FaCogs />
          </button>

          <span
            className={styles.actionsCount}
            style={{
              backgroundColor: state.hasActionsError ? colors.red : null,
            }}
            onClick={() =>
              !state.isConnecting && actions.changeTab(Tab.Actions)
            }
          >
            {state.hasActionsError ? '!' : state.actionsCount}
          </span>
        </div>
      </Tooltip>
      <Tooltip text="Charts">
        <button
          className={css(
            styles.button,
            state.currentApp &&
              state.currentTab === Tab.Charts &&
              styles.activeButton
          )}
          disabled={state.isConnecting}
          onClick={() => actions.changeTab(Tab.Charts)}
        >
          <FaProjectDiagram />
        </button>
      </Tooltip>
      <Tooltip text="Components">
        <button
          className={css(
            styles.button,
            state.currentApp &&
              state.currentTab === Tab.Components &&
              styles.activeButton
          )}
          disabled={state.isConnecting}
          onClick={() => actions.changeTab(Tab.Components)}
        >
          <FaCode />
        </button>
      </Tooltip>
      <Tooltip text="History">
        <button
          className={css(
            styles.button,
            state.currentApp &&
              state.currentTab === Tab.History &&
              styles.activeButton
          )}
          disabled={state.isConnecting}
          onClick={() => actions.changeTab(Tab.History)}
        >
          <FaHistory />
        </button>
      </Tooltip>
      <Tooltip text="Flushes">
        <button
          className={css(
            styles.button,
            state.currentApp &&
              state.currentTab === Tab.Flushes &&
              styles.activeButton
          )}
          disabled={state.isConnecting}
          onClick={() => actions.changeTab(Tab.Flushes)}
        >
          <FaSave />
        </button>
      </Tooltip>
      {process.env.NODE_ENV === 'development' ? (
        <Tooltip text="Console">
          <button
            className={css(
              styles.button,
              state.currentApp &&
                state.currentTab === Tab.Console &&
                styles.activeButton
            )}
            disabled={state.isConnecting}
            onClick={() => actions.changeTab(Tab.Console)}
          >
            <FaTerminal />
          </button>
        </Tooltip>
      ) : null}
    </div>
  )
}

export default Tabs
