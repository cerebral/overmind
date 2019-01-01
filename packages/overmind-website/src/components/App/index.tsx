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
import { useIsMobile, useScrollToTop } from '../../utils'
import Footer from '../Footer'

const pages = {
  [Page.HOME]: FrontPage,
  [Page.GUIDES]: Guides,
  [Page.GUIDE]: Guide,
  [Page.API]: Api,
  [Page.VIDEOS]: Videos,
}

const fadeInPage = () => {
  const el = document.querySelector('#overmind-app') as HTMLElement
  const logo = document.querySelector('#overmind-loader') as HTMLElement
  el.style.backgroundColor = 'rgb(250,250,250)'
  el.style.opacity = '1'
  logo.addEventListener('transitionend', () => {
    logo.style.display = 'none'
  })
  logo.style.opacity = '0'
}

const App: SFC = () => {
  const { state } = useOvermind()
  const mainRef = useRef(null)
  const isMobile = useIsMobile()
  useScrollToTop(state.page)
  useEffect(() => {
    fadeInPage()
    mainRef.current.style.opacity = '1'
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
    </div>
  )
}

export default App
