import * as React from 'react'
import marksy from 'marksy'
import styled from './styled-components'
import * as Prism from './prismjs.js'

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

const LoadingExample = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: ${({ theme }) => theme.color.fade(theme.color.black, 0.5)};
  background-color: ${({ theme }) => theme.color.gray};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
`

const FileName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
`

const GithubLink = styled.a`
  position: absolute;
  right: 10px;
  font-size: ${({ theme }) => theme.fontSize.smallest} !important;
  color: ${({ theme }) => theme.color.white} !important;
  opacity: 0.3;
  :hover {
    opacity: 0.8;
  }
`

const Notice = styled.div`
  background-color: ${({ theme }) =>
    theme.color.lighten(theme.color.white, -0.02)};
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-left: 6px solid ${({ theme }) => theme.color.primary};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  padding: ${({ theme }) => `${theme.padding.small} ${theme.padding.normal}`};
  font-size: ${({ theme }) => theme.fontSize.normal};
`

type TExample = {
  fileName: string
  code: string
  target: string
}

class Example extends React.Component<{
  name: string
}> {
  state: {
    isLoading: boolean
    content: TExample[]
  }
  currentExampleName = null
  constructor(props) {
    super(props)
    const localContent = JSON.parse(
      localStorage.getItem(this.getKey()) || 'null'
    )
    this.state = {
      isLoading: !localContent,
      content: localContent,
    }
  }
  componentDidMount() {
    this.getExample()
  }
  componentDidUpdate() {
    if (this.currentExampleName !== this.getExampleName()) {
      this.getExample()
    }
  }
  getExample() {
    import('../examples/' + this.props.name).then((module) => {
      this.currentExampleName = this.getExampleName()
      const content = module.default(Boolean(getTypescript()), getTheme())
      if (!content) {
        return console.warn('Missing content for ' + this.getKey())
      }
      localStorage.setItem(this.getKey(), JSON.stringify(content))
      this.setState({
        content,
        isLoading: false,
      })
    })
  }
  getKey() {
    return `${this.props.name}.${this.getExampleName()}`
  }
  getExampleName() {
    return getTheme() + '.' + (getTypescript() ? 'ts' : 'js')
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingExample>{'<loading/>'}</LoadingExample>
    }

    if (!this.state.content) {
      return (
        <span style={{ color: 'red', fontWeight: 'bold' }}>
          MISSING EXAMPLE ({this.props.name})
        </span>
      )
    }

    const url = `${getGithubBaseUrl()}examples/${this.props.name}.ts`
    return (
      <div>
        {this.state.content.map((example, index) => (
          <div key={index} style={{ position: 'relative' }}>
            {example.fileName ? <FileName>{example.fileName}</FileName> : null}
            <GithubLink
              href={url}
              target="_blank"
              style={{ top: example.fileName ? '32px' : '5px' }}
            >
              edit on github
            </GithubLink>
            {
              compile(
                `\`\`\`${example.target ||
                  'ts'}\n${example.code.trim()}\n\`\`\``
              ).tree
            }
          </div>
        ))}
      </div>
    )
  }
}

export const compile = marksy({
  createElement: React.createElement,
  highlight(language, code) {
    return Prism.highlight(code, Prism.languages[language], language)
  },
  components: {
    Example: ({ name }) => <Example key={name} name={name} />,
    Image: ({ src }) => (
      <img src={`/images/${src}`} style={{ width: '100%' }} />
    ),
    Notice: ({ children }) => <Notice>{compile(children).tree}</Notice>,
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
