import { createElement, SFC } from 'react'
import { useOvermind } from '../../app'
import { viewport, compile } from '../../utils'
import Logo from '../Logo'
import * as styles from './styles'
import { css } from 'emotion'

const Demo: SFC = () => {
  const { state } = useOvermind()

  if (!state.demos.length) {
    return null
  }

  const view =
    state.theme === 'react' && state.typescript ? 'react_ts' : state.theme
  const demoUrl = state.demos[0].sandboxes[view]

  return (
    <iframe
      className={styles.iframe}
      key={demoUrl}
      src={demoUrl}
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  )
}

const FrontPage: SFC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div
          className={css(
            styles.banner,
            viewport.isMobile && styles.bannerMobile
          )}
        >
          <Logo />
          <h1>frictionless webapp development</h1>
        </div>
        <div
          className={css(
            styles.valueProposition,
            viewport.isMobile && styles.valuePropositionMobile
          )}
        >
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
        </div>
        <div
          className={css(
            styles.valueProposition,
            viewport.isMobile && styles.valuePropositionMobile
          )}
        >
          {[
            <div key="0">
              {
                compile(`
\`\`\`marksy
h(Example, { name: "frontpage/actions" })
\`\`\`
              `).tree
              }
            </div>,
            <div key="1">
              <h2>SAFE AND PREDICTABLE CHANGES</h2>
              <p>
                When you build applications that performs many state changes
                things can get out of hand. In Overmind you can only perform
                state changes from <strong>actions</strong> and all changes are
                tracked by the development tool
              </p>
            </div>,
          ][viewport.isMobile ? 'reverse' : 'slice']()}
        </div>
        <div
          className={css(
            styles.valueProposition,
            viewport.isMobile && styles.valuePropositionMobile
          )}
        >
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
        </div>
        <div
          className={css(
            styles.valueProposition,
            viewport.isMobile && styles.valuePropositionMobile
          )}
        >
          {[
            <div key="0">
              {
                compile(`
\`\`\`marksy
h(Example, { name: "frontpage/typings" })
\`\`\`
              `).tree
              }
            </div>,
            <div key="1">
              <h2>WE WROTE THE TYPING</h2>
              <p>
                Overmind has you covered on typing. If you choose to use
                Typescript the whole API is built for excellent typing support.
                You will not spend time telling Typescript how your app works,
                Typescript will tell you!
              </p>
            </div>,
          ][viewport.isMobile ? 'reverse' : 'slice']()}
        </div>
        <h1>EXAMPLE</h1>
        <div className={styles.iframeWrapper}>
          <Demo />
        </div>
      </div>
    </div>
  )
}

export default FrontPage
