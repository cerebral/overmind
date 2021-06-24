import * as React from 'react'
import { useAppState } from '../../overmind'
import * as styles from './styles'
import * as text from '../../styles/text'
import Workspace from '../Workspace'
import { css } from 'emotion'

const Devtools: React.FunctionComponent = () => {
  const state = useAppState()

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

  return <Workspace />
}

export default Devtools
