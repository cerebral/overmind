import * as React from 'react'
import { getTypescript, getTheme, viewport, compile } from '../../utils'
import Logo from '../Logo'
import {
  Wrapper,
  Iframe,
  IframeWrapper,
  ValueProposition,
  Container,
  Banner,
  Button,
} from './elements'
import Icon from '../Icon'
import { TDemo } from '../App'

type Props = {
  demos: TDemo[]
}

class FrontPage extends React.Component<Props> {
  renderDemo() {
    if (!this.props.demos.length) {
      return null
    }

    const typescript = getTypescript()
    const theme = getTheme()
    const view = theme === 'react' && typescript ? 'react_ts' : theme
    const demoUrl = this.props.demos[0].sandboxes[view]
    return (
      <Iframe
        key={demoUrl}
        src={demoUrl}
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
    )
  }
  render() {
    return (
      <Wrapper>
        <Container>
          <Banner isMobile={viewport.isMobile}>
            <Logo />
          </Banner>
          <ValueProposition isMobile={viewport.isMobile}>
            <div>
              <h2>A SINGLE STATE TREE</h2>
              <p>
                Building your application as a single state tree is the most
                straight forward mental model. No matter how you choose to
                structure it, you will always have access to the state wherever
                you need it
              </p>
            </div>
            <div>
              {
                compile(`
\`\`\`marksy
h(Example, { name: "frontpage/statetree" })
\`\`\`
              `).tree
              }
            </div>
          </ValueProposition>
          <ValueProposition isMobile={viewport.isMobile}>
            {[
              <div>
                {
                  compile(`
\`\`\`marksy
h(Example, { name: "frontpage/actions" })
\`\`\`
              `).tree
                }
              </div>,
              <div>
                <h2>SAFE AND PREDICTABLE CHANGES</h2>
                <p>
                  When you build applications that performs many state changes
                  things can get out of hand. In Overmind you can only perform
                  state changes from <strong>actions</strong> and all changes
                  are tracked by the development tool
                </p>
              </div>,
            ][viewport.isMobile ? 'reverse' : 'slice']()}
          </ValueProposition>
          <ValueProposition isMobile={viewport.isMobile}>
            <div>
              <h2>FUNCTIONAL ACTIONS</h2>
              <p>
                When pieces of logic becomes complex it is beneficial to write
                functional code. Overmind provides and API named{' '}
                <strong>operators</strong> which gives you functional power as
                simple actions
              </p>
            </div>
            <div>
              {
                compile(`
\`\`\`marksy
h(Example, { name: "frontpage/operators" })
\`\`\`
              `).tree
              }
            </div>
          </ValueProposition>
          <ValueProposition isMobile={viewport.isMobile}>
            {[
              <div>
                {
                  compile(`
\`\`\`marksy
h(Example, { name: "frontpage/typings" })
\`\`\`
              `).tree
                }
              </div>,
              <div>
                <h2>WE WROTE THE TYPING</h2>
                <p>
                  Overmind has you covered on typing. If you choose to use
                  Typescript the whole API is built for excellent typing
                  support. You will not spend time telling Typescript how your
                  app works, Typescript will tell you!
                </p>
              </div>,
            ][viewport.isMobile ? 'reverse' : 'slice']()}
          </ValueProposition>
          {viewport.isMobile ? null : (
            <>
              <h1>DEMO</h1>
              <IframeWrapper>{this.renderDemo()}</IframeWrapper>
            </>
          )}
        </Container>
      </Wrapper>
    )
  }
}

export default FrontPage
