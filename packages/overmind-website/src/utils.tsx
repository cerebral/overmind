import {
  h,
  Component,
  useState,
  useEffect,
  useOvermind,
} from 'overmind-components'
import marksy from 'marksy'
import * as Prism from '../src/prismjs.js'
import { css } from 'emotion'

export const viewport = {
  isMobile: window.innerWidth <= 1024,
  set() {
    this.isMobile = window.innerWidth <= 1024
  },
}

export const getBranch = () =>
  location.host.split('.')[0] === 'next' || location.hostname === 'localhost'
    ? 'next'
    : 'master'

export const getGithubBaseUrl = () =>
  `https://github.com/cerebral/overmind/edit/${getBranch()}/packages/overmind-website/`

export const getTheme = () => localStorage.getItem('theme') || 'react'

export const getTypescript = () => localStorage.getItem('typescript') || false

const loadingExample = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: var(--color-black-2);
  background-color: var(--color-gray-1);
  border-radius: var(--border-radius-1);
`

const fileName = css`
  font-size: var(--font-size-3);
  font-weight: bold;
`

const githubLink = css`
  position: absolute;
  right: 10px;
  font-size: var(--font-size-1) !important;
  color: var(--color-white) !important;
  opacity: 0.3;
  :hover {
    opacity: 0.8;
  }
`

const notice = css`
  background-color: var(--color-white-2);
  border: 1px solid var(--color-primary);
  border-left: 6px solid var(--color-primary);
  border-radius: var(--border-radius-1);
  padding: var(--padding-3) var(--padding-4);
  font-size: var(--font-size-3);
`

const Example: Component<{ name: string }> = ({ name }) => {
  const { state } = useOvermind()
  const [localState, setLocalState] = useState({
    isLoading: true,
    content: null,
  })

  function getExampleName() {
    return state.theme + '.' + (state.typescript ? 'ts' : 'js')
  }

  function getKey() {
    return `${name}.${getExampleName()}`
  }

  useEffect(
    () => {
      import('../examples/' + name).then((module) => {
        const content = module.default(state.typescript, state.theme)
        if (!content) {
          return console.warn('Missing content for ' + getKey())
        }

        setLocalState({
          content,
          isLoading: false,
        })
      })
    },
    [name, state.theme, state.typescript]
  )

  if (localState.isLoading) {
    return <div className={loadingExample}>{'<loading/>'}</div>
  }

  if (!localState.content) {
    return (
      <span style={{ color: 'red', fontWeight: 'bold' }}>
        MISSING EXAMPLE ({name})
      </span>
    )
  }

  const url = `${getGithubBaseUrl()}examples/${name}.ts`

  return (
    <div>
      {localState.content.map((example, index) => (
        <div key={index} style={{ position: 'relative' }}>
          {example.fileName ? (
            <span className={fileName}>{example.fileName}</span>
          ) : null}
          <a
            className={githubLink}
            href={url}
            target="_blank"
            style={{ top: example.fileName ? '32px' : '5px' }}
          >
            edit on github
          </a>
          {
            compile(
              `\`\`\`${example.target || 'ts'}\n${example.code.trim()}\n\`\`\``
            ).tree
          }
        </div>
      ))}
    </div>
  )
}

export const compile = marksy({
  createElement: h,
  highlight(language, code) {
    return Prism.highlight(code, Prism.languages[language], language)
  },
  components: {
    Example: ({ name }) => <Example key={name} name={name} />,
    Image: ({ src }) => (
      <img src={`/images/${src}`} style={{ width: '100%' }} />
    ),
    Notice: ({ children }) => {
      return <div className={notice}>{compile(String(children)).tree}</div>
    },
  },
  elements: {
    a({ href, children }) {
      return (
        <a href={href} target={href.indexOf('http') === 0 ? '_blank' : null}>
          {children}
        </a>
      )
    },
  },
})

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    let currentWidth = window.innerWidth
    window.addEventListener('resize', () => {
      if (currentWidth > 1024 && window.innerWidth <= 1024) {
        setIsMobile(true)
      } else if (currentWidth <= 1024 && window.innerWidth > 1024) {
        setIsMobile(false)
      }
      currentWidth = window.innerWidth
    })
  }, [])

  return isMobile
}

export const useScrollToTop = (value) => {
  useEffect(
    () => {
      document.querySelector('#overmind-app').scrollTop = 0
    },
    [value]
  )
}
