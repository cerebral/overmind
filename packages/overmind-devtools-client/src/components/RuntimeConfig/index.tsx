import * as React from 'react'
import { useActions, useAppState } from '../../overmind'
import * as styles from './styles'
import { colors } from '../../theme'

const RuntimeConfig: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  return (
    <div
      className={styles.wrapper}
      onClick={() => actions.toggleRuntimeConfig()}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.configWrapper}>
          <div className={styles.configDescription}>
            <h4 className={styles.configTitle}>Status</h4>
            <div>
              <strong>Refresh</strong> your browser or <strong>run</strong> the
              application in the devtool below.
            </div>
          </div>
          <div className={styles.configValue}>
            <strong
              style={{
                color: state.isConnecting ? colors.red : colors.green,
              }}
            >
              {state.isConnecting ? 'Disconnected' : 'Connected'}
            </strong>
          </div>
        </div>
        <div className={styles.configWrapper}>
          <div className={styles.configDescription}>
            <h4 className={styles.configTitle}>Devtool port</h4>
            <div>Application has to connect to this port.</div>
            <div style={{ color: colors.green, marginTop: '4px' }}>
              Current server port: {state.port}
            </div>
            <div
              style={{
                color: colors.highlight,
                fontSize: '12px',
                marginTop: '4px',
              }}
            >
              Start with OV_DEV_PORT=xxxx npm start to change the port
            </div>
            <pre className={styles.code}>
              <span style={{ color: colors.purple }}>const</span> overmind ={' '}
              {state.port === 3031 ? (
                <>
                  <span style={{ color: colors.green }}>createOvermind</span>
                  (config)
                </>
              ) : (
                <>
                  <span style={{ color: colors.green }}>createOvermind</span>
                  (config, {'{'}
                  {`\n`}
                  {'  '}devtools:{' '}
                  <span style={{ color: colors.yellow }}>
                    "localhost:{state.port}"
                  </span>
                  {`\n`}
                  {'}'})
                </>
              )}
            </pre>
          </div>
          <div className={styles.configValue}>
            <form onClick={(e) => e.stopPropagation()}>
              <input
                id="port-input"
                className={styles.newPort}
                value={String(state.port)}
                disabled
                readOnly
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RuntimeConfig
