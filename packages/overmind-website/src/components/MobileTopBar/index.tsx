import { css } from 'emotion'
import { SFC, createElement, useEffect, useRef } from 'react'

import { useOvermind } from '../../overmind'
import { Page } from '../../overmind/types'
import Icon from '../Icon'
import ViewSelector from '../ViewSelector'
import * as styles from './styles'

type Props = {
  selectedTheme: string
  currentPage: string
  currentPath: string
}

const MobileTopBar: SFC = () => {
  const { state } = useOvermind()
  const bar = useRef(null)
  const menu = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => (bar.current.style.top = '0'))
  }, [])

  function openMenu() {
    menu.current.style.transform = 'translate3d(0, 0, 0)'
  }

  function closeMenu() {
    menu.current.style.transform = 'translate3d(-110vw, 0, 0)'
  }

  return (
    <div className={styles.wrapper} ref={bar}>
      <div onClick={openMenu}>
        <Icon>bars</Icon>
      </div>
      <ViewSelector />
      <div className={styles.menuWrapper} onClick={closeMenu} ref={menu}>
        <div className={styles.menu}>
          <a
            className={css(
              styles.link,
              state.page === Page.HOME && styles.linkSelected
            )}
            href="/"
          >
            Home
          </a>
          <a
            href="/introduction"
            className={css(
              styles.link,
              state.page === Page.INTRODUCTION && styles.linkSelected
            )}
          >
            Introduction
          </a>
          <a
            href="/guides"
            className={css(
              styles.link,
              state.page === Page.GUIDES && styles.linkSelected
            )}
          >
            Guides
          </a>
          <a
            href="/videos"
            className={css(
              styles.link,
              state.page === Page.VIDEOS && styles.linkSelected
            )}
          >
            Videos
          </a>
          <h3>API</h3>
          {state.apis.map((api) => {
            return (
              <a
                href={'/api/' + api.title}
                className={css(
                  styles.apiLink,
                  state.page === Page.API &&
                    state.currentApi === api.title &&
                    styles.linkSelected
                )}
              >
                {api.title}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MobileTopBar
