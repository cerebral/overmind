import { createElement, SFC, useRef, useEffect } from 'react'
import { useOvermind } from '../../overmind'
import * as styles from './styles'
import ViewSelector from '../ViewSelector'
import Icon from '../Icon'
import { Page } from '../../overmind/types'
import { css } from 'emotion'

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
          <a
            href="/api/action"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'action' &&
                styles.linkSelected
            )}
          >
            Api - Action
          </a>
          <a
            href="/api/config"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'config' &&
                styles.linkSelected
            )}
          >
            Api - Config
          </a>
          <a
            href="/api/connect"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'connect' &&
                styles.linkSelected
            )}
          >
            Api - Connect
          </a>
          <a
            href="/api/derive"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'derive' &&
                styles.linkSelected
            )}
          >
            Api - Derive
          </a>
          <a
            href="/api/effects"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'effects' &&
                styles.linkSelected
            )}
          >
            Api - Effects
          </a>
          <a
            href="/api/log"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'log' &&
                styles.linkSelected
            )}
          >
            Api - Log
          </a>
          <a
            href="/api/oninitialize"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'oninitialize' &&
                styles.linkSelected
            )}
          >
            Api - OnInitialize
          </a>
          <a
            href="/api/operators"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'operators' &&
                styles.linkSelected
            )}
          >
            Api - Operators
          </a>
          <a
            href="/api/overmind"
            className={css(
              styles.link,
              state.page === Page.API &&
                state.currentApi === 'overmind' &&
                styles.linkSelected
            )}
          >
            Api - Overmind
          </a>
        </div>
      </div>
    </div>
  )
}

export default MobileTopBar
