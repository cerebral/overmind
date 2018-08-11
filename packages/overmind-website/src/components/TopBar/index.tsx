import * as React from 'react'
import { Wrapper, Link } from './elements'
import Search from '../Search'
import ViewSelector from '../ViewSelector'

type Props = {
  currentPage: string
  selectedTheme: string
}

class TopBar extends React.Component<Props> {
  node: HTMLElement
  componentDidMount() {
    requestAnimationFrame(() => (this.node.style.top = '0'))
  }
  render() {
    const { selectedTheme, currentPage } = this.props

    return (
      <Wrapper
        innerRef={(node) => {
          this.node = node
        }}
      >
        <Link href="/" selected={currentPage === '/'}>
          Home
        </Link>
        <Link href="/guides" selected={currentPage.indexOf('/guides') === 0}>
          Guides
        </Link>
        <Link href="/videos" selected={currentPage.indexOf('/videos') === 0}>
          Videos
        </Link>
        <Link href="/api" selected={currentPage.indexOf('/api') === 0}>
          Api
        </Link>
        <Search />
        <ViewSelector selectedTheme={selectedTheme} />
      </Wrapper>
    )
  }
}

export default TopBar
