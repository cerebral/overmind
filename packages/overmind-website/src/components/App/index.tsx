import * as React from 'react'
import FrontPage from '../FrontPage'
import * as page from 'page'
import * as themes from 'overmind-themes'
import { ThemeProvider } from '../../styled-components'
import { getTheme, viewport } from '../../utils'
import Guides from '../Guides'
import Videos from '../Videos'
import Guide from '../Guide'
import Api from '../Api'
import TopBar from '../TopBar'
import MobileTopBar from '../MobileTopBar'
import { Wrapper } from './elements'
import Workshop from '../Workshop'

const routesMap = {
  '/': FrontPage,
  '/guides': Guides,
  '/guides/:type/:title': Guide,
  '/videos': Videos,
  '/videos/:title': Videos,
  '/api/:title': Api,
  '/workshop': Workshop,
}

export type TVideo = {
  title: string
  type: string
  fileName: string
  url: string
  shortName: string
}

export type TGuide = {
  title: string
  type: string
  fileName: string
}

export type TApi = {
  title: string
  fileName: string
}

export type TDemo = {
  title: string
  sandboxes: {
    [view: string]: string
  }
}

type State = {
  currentPage: string
  currentPath: string
  videos: TVideo[]
  guides: TGuide[]
  demos: TDemo[]
  apis: TApi[]
  isLoading: boolean
}

class App extends React.Component<{}, State> {
  state = {
    currentPage: null,
    currentPath: null,
    videos: [],
    demos: [],
    guides: [],
    apis: [],
    isLoading: true,
  }
  componentWillMount() {
    const routes = Object.keys(routesMap)

    routes.forEach((route) =>
      page(route, (context) =>
        this.setState({ currentPage: route, currentPath: context.path })
      )
    )

    page.redirect('/api', '/api/action')
  }
  componentDidUpdate(_, prevState) {
    if (prevState.currentPath !== this.state.currentPath) {
      document.querySelector('#overmind-app').scrollTop = 0
    }
  }
  componentDidMount() {
    const el = document.querySelector('#overmind-app') as HTMLElement

    el.style.backgroundColor = themes[getTheme()].color.dark
    page.start({})

    Promise.all([
      fetch('/backend/guides').then((response) => response.json()),
      fetch('/backend/videos').then((response) => response.json()),
      fetch('/backend/demos').then((response) => response.json()),
      fetch('/backend/apis').then((response) => response.json()),
    ]).then(([guides, videos, demos, apis]) =>
      this.setState({
        isLoading: false,
        guides,
        videos,
        demos,
        apis,
      })
    )
  }
  render() {
    const { currentPage, currentPath } = this.state

    if (!currentPage) {
      return null
    }

    const Page = routesMap[this.state.currentPage]

    return (
      <ThemeProvider theme={themes[getTheme()]}>
        <Wrapper>
          {viewport.isMobile ? (
            <MobileTopBar
              currentPage={currentPage}
              selectedTheme={getTheme()}
              currentPath={currentPath}
            />
          ) : (
            <TopBar currentPage={currentPage} selectedTheme={getTheme()} />
          )}
          <Page
            currentPath={currentPath}
            isLoading={this.state.isLoading}
            videos={this.state.videos}
            demos={this.state.demos}
            apis={this.state.apis}
            guides={this.state.guides}
          />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default App
