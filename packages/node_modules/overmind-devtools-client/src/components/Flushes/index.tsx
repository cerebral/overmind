import * as React from 'react'
import { useAppState } from '../../overmind'
import * as textStyles from '../../styles/text'
import ValueInspector from '../ValueInspector'
import * as styles from './styles'
import { css } from 'emotion'

const Flushes: React.FunctionComponent = () => {
  const state = useAppState()

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.panels}>
          <div className={styles.panel}>
            <span className={css(textStyles.label, textStyles.denseLabel)}>
              flush count
            </span>
            <span className={css(textStyles.header, textStyles.denseHeader)}>
              {state.flushes.length}
            </span>
          </div>
          <div className={styles.panel}>
            <span className={css(textStyles.label, textStyles.denseLabel)}>
              mutations count
            </span>
            <span className={css(textStyles.header, textStyles.denseHeader)}>
              {state.flushesMutationsCount}
            </span>
          </div>
          <div className={styles.panel}>
            <span className={css(textStyles.label, textStyles.denseLabel)}>
              paths updated
            </span>
            <span className={css(textStyles.header, textStyles.denseHeader)}>
              {state.flushesStatePathCount}
            </span>
          </div>
        </div>
      </div>
      {state.flushes.map((flush, index) => (
        <div className={styles.flushWrapper} key={index}>
          <div className={styles.flushHeader}>
            <div className={styles.flushTitle}>{flush.actionName}</div>
            <div className={styles.flushDetails} />
          </div>
          <div className={styles.flushBody}>
            {flush.mutations.map((mutation, index) => {
              return (
                <span className={styles.mutation} key={index}>
                  <span
                    className={css(textStyles.description, textStyles.yellow)}
                  >
                    {mutation.method}
                  </span>
                  <span className={textStyles.description}>
                    {mutation.path}
                  </span>
                  {mutation.args.map((arg, index) => (
                    <ValueInspector
                      key={index}
                      value={arg}
                      delimiter={state.currentApp.delimiter}
                      small
                    />
                  ))}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Flushes
