import * as React from 'react'
import { useAppState, useEffects } from '../../overmind'
import * as styles from './styles'
import * as text from '../../styles/text'
import App from '../App'
import { css } from 'emotion'
import Workspace from '../Workspace'

const Devtools: React.FunctionComponent = () => {
  const state = useAppState()
  const effects = useEffects()

  if (state.error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={css(text.header, text.white)}>
            Ops, there is an error :(
          </div>
          <div className={text.red}>{state.error}</div>
        </div>
      </div>
    )
  }

  if (effects.platform.isVSCodeExtension()) {
    return <Workspace />
  }

  return <App />
}

export default Devtools
