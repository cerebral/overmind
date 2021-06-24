import * as React from 'react'
import { useAppState } from '../../overmind'
import * as styles from './styles'
import ActionOperator from '../ActionOperator'
import {
  getOperatorId,
  nameToColor,
  getOperatorsByPath,
} from '../../overmind/utils'
import { OperatorsByPath, Action as TAction } from '../../overmind/types'

type Props = {
  action: TAction
  inline?: boolean
}

const Action: React.FunctionComponent<Props> = ({ action, inline }) => {
  const state = useAppState()
  const operatorsByPath = getOperatorsByPath(action)

  function renderOperators(operatorsByPath: OperatorsByPath) {
    return operatorsByPath.map((operatorByPath, index) => {
      const flushReference =
        state.currentApp.flushByOperatorId[
          getOperatorId(operatorByPath.operator)
        ]
      const flush =
        flushReference && state.currentApp.flushes[flushReference.flushId]

      return (
        <div
          key={operatorByPath.path + index}
          style={{
            opacity: operatorByPath.operator.isSkipped ? 0.5 : 1,
          }}
        >
          <ActionOperator
            operator={operatorByPath.operator}
            flush={flush}
            value={operatorByPath.value}
          />
          {operatorByPath.operator.isIntercepted ? (
            <div className={styles.breakStyle}>break</div>
          ) : null}
          {operatorByPath.childrenByPath.length
            ? operatorByPath.childrenByPath.map(
                (childOperatorsByPath, index) => (
                  <div key={index} className={styles.operatorChildren}>
                    <div
                      className={styles.path}
                      style={{
                        backgroundColor: nameToColor(
                          childOperatorsByPath[0].path
                        ),
                      }}
                    >
                      {childOperatorsByPath[0].path}
                    </div>
                    <div className={styles.pathOperators}>
                      {renderOperators(childOperatorsByPath)}
                    </div>
                  </div>
                )
              )
            : null}
        </div>
      )
    })
  }

  if (inline) {
    return (
      <div className={styles.innerWrapper}>
        <div className={styles.innerTitle}>{action.actionName}</div>
        <div className={styles.innerContent}>
          {operatorsByPath.map(renderOperators)}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>{operatorsByPath.map(renderOperators)}</div>
  )
}

export default Action
