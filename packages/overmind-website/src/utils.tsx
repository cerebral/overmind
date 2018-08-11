import * as React from 'react'
import marksy from 'marksy/components'
import styled from './styled-components'
import * as Prism from './prismjs.js'

export const getTheme = () => localStorage.getItem('theme') || 'react'

export const getTypescript = () => localStorage.getItem('typescript') || false

export const views = ['react', 'vue']

const LoadingExample = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: ${({ theme }) => theme.color.fade(theme.color.black, 0.5)};
  background-color: ${({ theme }) => theme.color.gray};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
`

class Example extends React.Component<{ example: string }> {
  state: {
    isLoading: boolean
    content: string[]
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

    views.forEach((view) => {
      if (!examples.includes(view)) {
        console.warn(`Missing example for ${view} in ${this.props.example}`)
      }
      if (!examples.includes(`${view}_ts`)) {
        console.warn(
          `Missing example for ${view} with TypeScript in ${this.props.example}`
        )
      }
    })
  }
  getExample() {
    import('../examples/' + this.props.example).then((module) => {
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
    return `${this.props.example}.${this.getExampleName()}`
  }
  getExampleName() {
    const theme = getTheme()
    const ts = getTypescript()

    return ts ? `${theme}Ts` : theme
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingExample>{'<loading/>'}</LoadingExample>
    }

    if (!this.state.content) {
      return 'Missing example'
    }

    return this.state.content.map(
      (code) => compile(`\`\`\`tsx\n${code.trim()}\n\`\`\``).tree
    )
  }
}

export const compile = marksy({
  createElement: React.createElement,
  highlight(language, code) {
    return Prism.highlight(code, Prism.languages[language], language)
  },
  components: {
    Example,
  },
})
