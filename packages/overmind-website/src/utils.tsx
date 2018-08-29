import * as React from 'react'
import marksy from 'marksy/components'
import styled from './styled-components'
import * as Prism from './prismjs.js'

export const viewport = {
  isMobile: window.innerWidth <= 1024,
  set() {
    this.isMobile = window.innerWidth <= 1024
  },
}

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

type TExample = {
  fileName: string
  code: string
  target: string
}

class Example extends React.Component<{
  name: string
  view?: boolean
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
  verifyExamples(module) {
    const examples = Object.keys(module)

    if (this.props.view) {
      ;['react', 'vue'].forEach((type) => {
        if (!examples.includes(type)) {
          console.warn(`Missing example for "${type}" in ${this.props.name}`)
        }
        if (!examples.includes(`${type}Ts`)) {
          console.warn(
            `Missing example for "${type}" with TypeScript in ${
              this.props.name
            }`
          )
        }
      })
    } else {
      ;['js', 'ts'].forEach((type) => {
        if (!examples.includes(type)) {
          console.warn(
            `Missing example for "${
              type === 'js' ? 'Vanilla JS' : 'TypeScript'
            }" in ${this.props.name}`
          )
        }
      })
    }
  }
  getExample() {
    import('../examples/' + this.props.name).then((module) => {
      this.currentExampleName = this.getExampleName()
      this.verifyExamples(module)

      if (module[this.currentExampleName]) {
        localStorage.setItem(
          this.getKey(),
          JSON.stringify(module[this.currentExampleName])
        )
      }
      this.setState({
        content: module[this.currentExampleName],
        isLoading: false,
      })
    })
  }
  getKey() {
    return `${this.props.name}.${this.getExampleName()}`
  }
  getExampleName() {
    if (this.props.view) {
      const theme = getTheme()
      const ts = getTypescript()

      return ts ? `${theme}Ts` : theme
    }

    return getTypescript() ? 'ts' : 'js'
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingExample>{'<loading/>'}</LoadingExample>
    }

    if (!this.state.content) {
      return 'Missing example'
    }

    return this.state.content.map((example, index) => (
      <React.Fragment key={index}>
        {example.fileName ? <FileName>{example.fileName}</FileName> : null}
        {
          compile(
            `\`\`\`${example.target || 'ts'}\n${example.code.trim()}\n\`\`\``
          ).tree
        }
      </React.Fragment>
    ))
  }
}

export const compile = marksy({
  createElement: React.createElement,
  highlight(language, code) {
    return Prism.highlight(code, Prism.languages[language], language)
  },
  components: {
    Example: ({ name, view }) => <Example key={name} name={name} view={view} />,
    Image: ({ src }) => (
      <img src={`/images/${src}`} style={{ width: '100%' }} />
    ),
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
