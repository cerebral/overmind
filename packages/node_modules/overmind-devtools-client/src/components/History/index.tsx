import * as React from 'react'
import * as styles from './styles'
import { useAppState } from '../../overmind'
import {
  HistoryRecordType,
  MutationHistoryRecord,
  FlushHistoryRecord,
  EffectHistoryRecord,
} from '../../overmind/types'
import ValueInspector from '../ValueInspector'
import {
  FaCode,
  FaLink,
  FaSave,
  FaDatabase,
  FaClock,
  FaCheck,
} from 'react-icons/fa'

const History: React.FunctionComponent = () => {
  const state = useAppState()

  return (
    <div className={styles.wrapper}>
      {state.history.map((record, index) => {
        switch (record.type) {
          case HistoryRecordType.Mutation: {
            const mutationRecord = record as MutationHistoryRecord

            return (
              <div className={styles.recordWrapper} key={index}>
                <div className={styles.label}>
                  <FaDatabase />
                </div>
                <div className={styles.actionName}>
                  {mutationRecord.actionName}
                </div>
                <div className={styles.mutationType}>
                  {mutationRecord.data.method}
                </div>
                <div className={styles.mutationPath}>
                  {mutationRecord.data.path}
                </div>
                {mutationRecord.data.args.map((arg, index) => (
                  <div className={styles.arg} key={'arg_' + index}>
                    <ValueInspector
                      value={arg}
                      delimiter={state.currentApp.delimiter}
                      small
                    />
                  </div>
                ))}
              </div>
            )
          }
          case HistoryRecordType.Flush: {
            const flushRecord = record as FlushHistoryRecord

            return (
              <div className={styles.recordWrapper} key={index}>
                <div className={styles.label}>
                  <FaSave />
                </div>
                <div className={styles.actionName}>
                  {flushRecord.actionName}
                </div>
                <div className={styles.flushDetail}>
                  {flushRecord.data.components.length} <FaCode />
                  {flushRecord.data.components.length ? (
                    <div className={styles.flushPopup}>
                      {flushRecord.data.components.join(', ')}
                    </div>
                  ) : null}
                </div>
                <div className={styles.flushDetail}>
                  {flushRecord.data.derived.length} <FaLink />
                  {flushRecord.data.derived.length ? (
                    <div className={styles.flushPopup}>
                      {flushRecord.data.derived.join(', ')}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          }
          case HistoryRecordType.Effect: {
            const effectRecord = record as EffectHistoryRecord

            // If the effect was sync, we do not show both start and end
            if (
              state.history[index - 1] &&
              state.history[index - 1].data.effectId ===
                effectRecord.data.effectId
            ) {
              return null
            }

            return (
              <div className={styles.recordWrapper} key={index}>
                <div className={styles.label}>
                  {effectRecord.data.isPending ? <FaClock /> : <FaCheck />}
                </div>
                <div className={styles.actionName}>
                  {effectRecord.actionName}
                </div>
                <div className={styles.effectPath}>
                  {effectRecord.data.name
                    ? effectRecord.data.name + '.' + effectRecord.data.method
                    : effectRecord.data.method}
                </div>
                {effectRecord.data.args.map((arg, index) => (
                  <div className={styles.arg} key={'arg_' + index}>
                    <ValueInspector
                      value={arg}
                      delimiter={state.currentApp.delimiter}
                      small
                    />
                  </div>
                ))}
              </div>
            )
          }
        }

        return null
      })}
    </div>
  )
}

export default History
