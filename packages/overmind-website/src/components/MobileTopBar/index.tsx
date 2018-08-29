import * as React from 'react'
import { Wrapper, MenuWrapper, Menu, Link } from './elements'
import ViewSelector from '../ViewSelector'
import Icon from '../Icon'

type Props = {
  selectedTheme: string
  currentPage: string
  currentPath: string
}

class MobileTopBar extends React.Component<Props> {
  node: HTMLElement
  menu: HTMLElement
  componentDidMount() {
    requestAnimationFrame(() => (this.node.style.top = '0'))
  }
  openMenu = () => {
    this.menu.style.transform = 'translate3d(0, 0, 0)'
    const page: HTMLElement = document.querySelector('#overmind-app')
    page.style.overflowY = 'hidden'
  }
  closeMenu = () => {
    this.menu.style.transform = 'translate3d(-110vw, 0, 0)'
    const page: HTMLElement = document.querySelector('#overmind-app')
    page.style.overflowY = 'scroll'
  }
  render() {
    const { selectedTheme, currentPage, currentPath } = this.props

    return (
      <Wrapper
        innerRef={(node) => {
          this.node = node
        }}
      >
        <div onClick={this.openMenu}>
          <Icon>bars</Icon>
        </div>
        <ViewSelector selectedTheme={selectedTheme} />
        <MenuWrapper
          onClick={this.closeMenu}
          innerRef={(node) => {
            this.menu = node
          }}
        >
          <Menu>
            <Link href="/" selected={currentPage === '/'}>
              Home
            </Link>
            <Link
              href="/guides"
              selected={currentPage.indexOf('/guides') === 0}
            >
              Guides
            </Link>
            <Link
              href="/videos"
              selected={currentPage.indexOf('/videos') === 0}
            >
              Videos
            </Link>
            <Link href="/api/action" selected={currentPath === '/api/action'}>
              Api - Action
            </Link>
            <Link href="/api/app" selected={currentPath === '/api/app'}>
              Api - App
            </Link>
            <Link href="/api/compute" selected={currentPath === '/api/compute'}>
              Api - Compute
            </Link>
            <Link href="/api/connect" selected={currentPath === '/api/connect'}>
              Api - Connect
            </Link>
            <Link href="/api/derive" selected={currentPath === '/api/derive'}>
              Api - Derived
            </Link>
            <Link href="/api/effects" selected={currentPath === '/api/effects'}>
              Api - Effects
            </Link>
            <Link href="/api/modules" selected={currentPath === '/api/modules'}>
              Api - Modules
            </Link>
            <Link
              href="/api/reaction"
              selected={currentPath === '/api/reaction'}
            >
              Api - Reaction
            </Link>
          </Menu>
        </MenuWrapper>
      </Wrapper>
    )
  }
}

export default MobileTopBar
