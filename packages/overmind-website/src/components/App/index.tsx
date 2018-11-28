import { h, useRef, useEffect } from 'overmind-components'
import { Component } from '../../app'
import * as styles from './styles'
import TopBar from '../TopBar'
import FrontPage from '../FrontPage'
import Guides from '../Guides'
import { Page } from '../../app/types'
import Guide from '../Guide'
import Api from '../Api'
import MobileTopBar from '../MobileTopBar'
import { useIsMobile, useScrollToTop } from '../../utils'

const pages = {
  [Page.HOME]: FrontPage,
  [Page.GUIDES]: Guides,
  [Page.GUIDE]: Guide,
  [Page.API]: Api,
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

const App: Component = ({ state }) => {
  const mainRef = useRef()
  const isMobile = useIsMobile()
  useScrollToTop(state.page)
  useEffect(
    () => {
      fadeInPage()
      mainRef.target.style.opacity = '1'
    },
    [mainRef.target]
  )

  if (!state.page) {
    return null
  }

  const Page = pages[state.page]

  return (
    <div ref={mainRef} className={styles.wrapper}>
      {isMobile ? <MobileTopBar /> : <TopBar />}
      <Page />
    </div>
  )
}

export default App
