import * as React from 'react'
import { useAppState, useActions } from '../../overmind'
import * as styles from './styles'
import * as textStyles from '../../styles/text'
import { css } from 'emotion'
import { colors } from '../../theme'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Components: React.FunctionComponent = () => {
  const state = useAppState()
  const actions = useActions()

  function renderStats() {
    return (
      <div className={styles.statsContainer}>
        <div className={styles.panels}>
          <div className={styles.panel}>
            <span className={css(textStyles.label, textStyles.denseLabel)}>
              connected
            </span>
            <span className={css(textStyles.header, textStyles.denseHeader)}>
              {state.componentsMounted.length}
            </span>
          </div>
          <div className={styles.panel}>
            <span className={css(textStyles.label, textStyles.denseLabel)}>
              update count
            </span>
            <span
              className={css(textStyles.header, textStyles.denseHeader)}
              style={{ color: colors.blue }}
            >
              {state.componentsUpdateCount}
            </span>
          </div>
          <div className={styles.panel}>
            <span className={css(textStyles.label, textStyles.denseLabel)}>
              paths count
            </span>
            <span
              className={css(textStyles.header, textStyles.denseHeader)}
              style={{ color: colors.green }}
            >
              {state.componentsStatePathCount}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {renderStats()}
      {Object.keys(state.groupedComponents).map((name) => {
        const groupedComponent = state.groupedComponents[name]

        return (
          <div key={name}>
            {groupedComponent.components.map((component) => {
              return (
                <div
                  key={component.id}
                  className={styles.component}
                  onClick={() => actions.toggleCollapsedComponent(component)}
                >
                  <div className={styles.componentName}>{component.name}</div>
                  <div
                    className={styles.componentPathsCount}
                    style={{
                      backgroundColor: colors.blue,
                    }}
                  >
                    {component.updateCount}
                  </div>
                  <div
                    className={styles.componentPathsCount}
                    style={{
                      backgroundColor:
                        component.paths.length <= 10
                          ? colors.green
                          : component.paths.length <= 20
                          ? colors.yellow
                          : colors.red,
                    }}
                  >
                    {component.paths.length}
                  </div>
                  <div className={styles.componentPaths}>
                    <div className={styles.componentPathsBody}>
                      <div className={styles.componentPathsHeader}>
                        <span className={css(textStyles.hint, styles.faded)}>
                          {component.isCollapsed ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronUp />
                          )}
                        </span>
                      </div>
                      {component.isCollapsed ? null : (
                        <div className={styles.componentPathsItems}>
                          {component.paths.map((path, index) => (
                            <span key={path}>
                              {path}
                              {index < component.paths.length - 1 ? (
                                <span className={styles.separator}>|</span>
                              ) : null}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Components
