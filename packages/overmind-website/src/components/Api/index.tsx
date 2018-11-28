import { h, useState, useEffect } from 'overmind-components'
import Doc from '../Doc'
import * as styles from './styles'
import { compile, getGithubBaseUrl } from '../../utils'
import { Api as TApi } from '../../app/types'
import { Component } from '../../app'
import { css } from 'emotion'

function getGithubUrl(name) {
  return getGithubBaseUrl() + '/api/' + name + '.md'
}

const Api: Component = ({ state }) => {
  const [content, setContent] = useState(null)

  useEffect(
    () => {
      import('../../../api/' + state.currentApi + '.md').then((module) =>
        setContent(module)
      )
    },
    [state.currentApi]
  )

  function renderToc(children) {
    return (
      <ul className={styles.tocList}>
        {children.map((child) => (
          <li className={styles.tocItem} key={child.id}>
            <a href={`#${child.id}`}>{child.title}</a>
            {child.children.length ? renderToc(child.children) : null}
          </li>
        ))}
      </ul>
    )
  }

  if (!content) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.listWrapper} />
        <Doc url={getGithubUrl(state.currentApi)} />
      </div>
    )
  }

  const compiled = compile(content)

  return (
    <div className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {state.apis.map((api) => {
            const fileShortName = api.fileName.replace('.md', '')
            const isSelected = state.currentApi === fileShortName

            return (
              <li
                className={css(styles.item, isSelected && styles.itemSelected)}
                key={api.fileName}
              >
                <a href={`/api/${fileShortName}`}>{api.title}</a>
                {isSelected && compiled.toc[0].children.length
                  ? renderToc(compiled.toc[0].children)
                  : null}
              </li>
            )
          })}
        </ul>
      </div>
      <Doc url={getGithubUrl(state.currentApi)}>{compiled.tree}</Doc>
    </div>
  )
}

export default Api
