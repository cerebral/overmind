import { createElement, SFC } from 'react'
import { useOvermind } from '../../overmind'
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
          <h1>frictionless state management</h1>
          <div className={styles.summary}>
            Web application development is about <strong>defining</strong>,{' '}
            <strong>changing</strong> and <strong>consuming state</strong> to
            produce a user experience. Overmind aims for a developer experience
            where that is all you focus on, reducing the orchestration of state
            management to a minimum. Making you a <strong>happier</strong> and
            more <strong>productive</strong> developer!
          </div>
        </div>
        <div
          className={css(
            styles.valueProposition,
            viewport.isMobile && styles.valuePropositionMobile
          )}
        >
          <div>
            {
              compile(`
![devtool](/images/amazing_devtools.png)
              `).tree
            }
          </div>
          <div>
            <h2>APPLICATION INSIGHT</h2>
            <p>
              Develop the application state, effects and actions without leaving{' '}
              <a href="https://code.visualstudio.com/" target="_blank">
                VS Code
              </a>
              , or use the standalone development tool. Everything that happens
              in your app is tracked and you can seamlessly code and run logic
              to verify that everything works as expected without having to
              implement UI.
            </p>
          </div>
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
              straight forward mental model. You get a complete overview, but
              can still organize the state by namespacing it into domains. The
              devtools allows you to edit and mock out state.
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
h(Example, { name: "frontpage/effects" })
\`\`\`
              `).tree
              }
            </div>,
            <div key="1">
              <h2>SEPARATION OF LOGIC</h2>
              <p>
                Separate 3rd party APIs and logic not specific to your
                application by using <strong>effects</strong>. This will keep
                your application logic pure and without low level APIs
                cluttering your code.
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
            <h2>SAFE AND PREDICTABLE CHANGES</h2>
            <p>
              When you build applications that perform many state changes things
              can get out of hand. In Overmind you can only perform state
              changes from <strong>actions</strong> and all changes are tracked
              by the development tool.
            </p>
          </div>
          <div>
            {
              compile(`
\`\`\`marksy
h(Example, { name: "frontpage/actions" })
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
h(Example, { name: "frontpage/operators" })
\`\`\`
                      `).tree
              }
            </div>,
            <div key="1">
              <h2>FUNCTIONAL ACTIONS</h2>
              <p>
                When pieces of logic become complex it is beneficial to write
                functional code. Overmind provides an API named{' '}
                <strong>operators</strong> which gives you functional power.
                Ignore it, use it where it makes sense or make your whole
                codebase functional. It is up to you!
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
            <h2>SNAPSHOT TESTING OF LOGIC</h2>
            <p>
              Bring in your application configuration of state, effects and
              actions. Create mocks for any effects. Take a snapshot of
              mutations performed in an action to ensure all intermediate states
              are met.
            </p>
          </div>
          <div>
            {
              compile(`
\`\`\`marksy
h(Example, { name: "frontpage/test" })
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
