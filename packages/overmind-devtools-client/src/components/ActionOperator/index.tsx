import { css } from 'emotion'
import * as React from 'react'

import { useAppState } from '../../overmind'
import {
  Effect,
  EventType,
  Flush,
  Mutation,
  Operator as OperatorType,
} from '../../overmind/types'
import * as textStyles from '../../styles/text'
import { colors } from '../../theme'
import Action from '../Action'
import * as actionStyles from '../Action/styles'
import ActionFlush from '../ActionFlush'
import ValueInspector from '../ValueInspector'
import * as styles from './styles'

type Props = {
  operator: OperatorType
  value: any
  flush: Flush
}

const ActionOperator: React.FunctionComponent<Props> = ({
  operator,
  value,
  flush,
}) => {
  const state = useAppState()
  const delimiter = state.currentApp.delimiter

  return (
    <div className={actionStyles.pipe}>
      <div className={styles.operator}>
        <div className={styles.operatorHeader}>
          <span
            className={styles.operatorType}
            style={{
              backgroundColor: operator.error ? colors.red : null,
              color: operator.error ? colors.text : null,
            }}
          >
            {operator.type}
          </span>
          <span className={styles.operatorName}>{operator.name}</span>
          <div className={styles.value}>
            {value === undefined ? null : (
              <ValueInspector delimiter={delimiter} value={value} small />
            )}
          </div>
          {flush ? <ActionFlush flush={flush} /> : null}
        </div>
        <div
          className={styles.operatorBody}
          onClick={(event) => event.stopPropagation()}
        >
          {operator.events.map((event, index) => {
            if (event.type === EventType.Effect) {
              const effect = event.data as Effect

              return (
                <div
                  className={css(
                    styles.operatorItem,
                    effect.isPending && styles.pendingOperatorItem
                  )}
                  key={index}
                >
                  <span
                    className={css(
                      textStyles.description,
                      textStyles.purple,
                      textStyles.monospace
                    )}
                  >
                    {effect.name
                      ? effect.name + '.' + effect.method
                      : effect.method}
                  </span>
                  <span className={styles.effectArgs}>
                    (
                    {effect.args.map((arg, argIndex) => (
                      <React.Fragment key={argIndex}>
                        <ValueInspector
                          delimiter={delimiter}
                          small
                          value={arg}
                        />
                        {argIndex === effect.args.length - 1 ? null : (
                          <span>,</span>
                        )}
                      </React.Fragment>
                    ))}
                    )
                  </span>
                  {effect.result === undefined && !effect.error ? null : (
                    <span
                      className={css(
                        textStyles.description,
                        textStyles.monospace
                      )}
                    >
                      {'=>'}
                    </span>
                  )}
                  {effect.result === undefined ? null : (
                    <ValueInspector
                      delimiter={delimiter}
                      small
                      value={effect.result}
                    />
                  )}
                  {effect.error ? (
                    <span className={styles.effectError}>{effect.error}</span>
                  ) : null}
                </div>
              )
            }

            if (event.type === EventType.Mutation) {
              const mutation = event.data as Mutation

              return (
                <div className={styles.operatorItem} key={index}>
                  <span
                    className={css(
                      textStyles.description,
                      textStyles.yellow,
                      textStyles.monospace
                    )}
                  >
                    {mutation.method}
                  </span>
                  <span
                    className={css(
                      textStyles.description,
                      textStyles.monospace
                    )}
                  >
                    {mutation.path.split(delimiter).join('.')}
                  </span>
                  {mutation.args.map((arg, argIndex) => (
                    <ValueInspector
                      delimiter={delimiter}
                      key={argIndex}
                      small
                      value={arg}
                    />
                  ))}
                </div>
              )
            }

            if (event.type === EventType.Action) {
              const id = event.data as string

              return (
                <Action
                  key={index}
                  action={state.currentApp.actions[id]}
                  inline
                />
              )
            }

            return null
          })}
          {operator.error ? (
            <div className={styles.operatorItem}>
              <span
                className={css(
                  textStyles.description,
                  textStyles.red,
                  textStyles.monospace
                )}
              >
                error
              </span>
              <span
                className={css(textStyles.description, textStyles.monospace)}
              >
                {operator.error}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ActionOperator
