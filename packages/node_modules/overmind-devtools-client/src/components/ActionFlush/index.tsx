import * as React from 'react'
import { useAppState } from '../../overmind'
import { Flush as FlushType } from '../../overmind/types'
import * as styles from './styles'
import * as textStyles from '../../styles/text'
import { css } from 'emotion'
import { FaCode, FaLink } from 'react-icons/fa'

type Props = {
  flush: FlushType
}

const ActionFlush: React.FunctionComponent<Props> = ({ flush }) => {
  const state = useAppState()

  return (
    <div className={styles.flush}>
      <div className={styles.flushHeader}>
        <span>
          {flush.components.length} <FaCode />
        </span>
        <span>
          {flush.derived.length} <FaLink />
        </span>
      </div>
      {flush.components.length || flush.derived.length ? (
        <div className={styles.flushBody}>
          {flush.components.map((componentId) => (
            <div key={componentId}>
              <span className={css(textStyles.description, styles.flushItem)}>
                <span className={styles.icon}>
                  <FaCode />
                </span>{' '}
                {state.currentApp.components[componentId].name}
              </span>
            </div>
          ))}
          {flush.derived.map((derivedPath, index) => (
            <div key={derivedPath + '_' + index}>
              <span className={css(textStyles.description, styles.flushItem)}>
                <span className={styles.icon}>
                  <FaLink />
                </span>{' '}
                {derivedPath}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
export default ActionFlush
