import * as React from 'react'

import { useAppState } from '../../overmind'
import ConsoleRow from '../ConsoleRow'
import * as styles from './styles'

const Console: React.FunctionComponent = () => {
  const state = useAppState()

  return (
    <div className={styles.wrapper}>
      {state.currentApp.messages.map((message, index) => (
        <ConsoleRow
          delimiter={state.currentApp.delimiter}
          key={index}
          message={message}
        />
      ))}
    </div>
  )
}
export default Console
