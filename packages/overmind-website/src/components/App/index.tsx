import { createElement, SFC, useRef, useEffect } from 'react'
import { useOvermind } from '../../overmind'
import * as styles from './styles'
import TopBar from '../TopBar'
import FrontPage from '../FrontPage'
import Guides from '../Guides'
import { Page } from '../../overmind/types'
import Guide from '../Guide'
import Videos from '../Videos'
import Api from '../Api'
import MobileTopBar from '../MobileTopBar'
import { useIsMobile, useScrollToPosition } from '../../utils'
import Footer from '../Footer'
import { hot } from 'react-hot-loader/root'
import GetStarted from '../GetStarted'

const pages = {
  [Page.HOME]: FrontPage,
  [Page.GETSTARTED]: GetStarted,
  [Page.GUIDES]: Guides,
  [Page.GUIDE]: Guide,
  [Page.API]: Api,
  [Page.VIDEOS]: Videos,
}

const fadeInPage = (cb: () => void) => {
  requestAnimationFrame(() => {
    const el = document.querySelector('#overmind-app') as HTMLElement
    const logo = document.querySelector('#overmind-loader') as HTMLElement
    el.style.backgroundColor = 'rgb(250,250,250)'
    el.style.opacity = '1'
    logo.addEventListener('transitionend', () => {
      logo.style.display = 'none'
    })
    logo.style.opacity = '0'
    cb()
  })
}

const App: SFC = () => {
  const { state } = useOvermind()
  const mainRef = useRef(null)
  const isMobile = useIsMobile()
  useScrollToPosition(state.page)
  useEffect(() => {
    fadeInPage(() => {
      mainRef.current.style.opacity = '1'
    })
  }, [])

  if (!state.page) {
    return null
  }

  const Page = pages[state.page]

  return (
    <div ref={mainRef} className={styles.wrapper}>
      {isMobile ? <MobileTopBar /> : <TopBar />}
      <div className={styles.pageWrapper}>
        <Page />
      </div>
      <Footer />
      {location.hostname === 'localhost' ||
      location.hostname.includes('next') ? (
        <div className={styles.preview}>
          This is the PREVIEW site of Overmind
        </div>
      ) : null}
    </div>
  )
}

export default hot(App)
