import * as React from 'react'
import * as styles from './styles'
import { StateMachine } from '../../overmind/types'
import { useAppState } from '../../overmind'
import { FaLongArrowAltRight } from 'react-icons/fa'
import ValueInspector from '../ValueInspector'

type Props = {
  machine: StateMachine
}

const StateMachineTransitions: React.FunctionComponent<Props> = ({
  machine,
}) => {
  const state = useAppState()

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toTimeString().split(' ')[0]
  }

  return (
    <div className={styles.transitionDetails}>
      {machine.transitions.map((transition, index) => {
        const hasPayload =
          transition.payload && Object.keys(transition.payload).length > 0

        return (
          <div key={transition.id + index} className={styles.stateTransition}>
            <div className={styles.transition}>
              <span className={styles.fromState}>{transition.fromState}</span>
              <FaLongArrowAltRight className={styles.arrow} />
              <span
                className={styles.eventType}
                title={formatTime(transition.timestamp)}
              >
                {transition.eventType}
              </span>
              <FaLongArrowAltRight className={styles.arrow} />
              <span className={styles.toState}>{transition.toState}</span>
            </div>

            {hasPayload && (
              <div className={styles.payload}>
                <ValueInspector
                  value={transition.payload}
                  delimiter={state.currentApp.delimiter}
                  small
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StateMachineTransitions
