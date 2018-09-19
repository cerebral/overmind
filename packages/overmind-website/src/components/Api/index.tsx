import * as React from 'react'
import Doc from '../Doc'
import { Wrapper, List, Item, ListWrapper, TocList, TocItem } from './elements'
import { compile, getGithubBaseUrl } from '../../utils'
import { TApi } from '../App'

type State = {
  content: string
}

type Props = {
  currentPath: string
  apis: TApi[]
  isLoading: boolean
}

class Api extends React.Component<Props, State> {
  state = {
    content: null,
  }
  componentDidMount() {
    this.getContent()
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentPath !== prevProps.currentPath) {
      this.getContent()
    }
  }
  getContent() {
    import('../../../api/' + this.getFileNameFromUrl() + '.md').then((module) =>
      this.setState({ content: module })
    )
  }
  getFileNameFromUrl() {
    return this.props.currentPath.split('/').pop()
  }
  renderToc(children) {
    return (
      <TocList>
        {children.map((child) => (
          <TocItem key={child.id}>
            <a href={`#${child.id}`}>{child.title}</a>
            {child.children.length ? this.renderToc(child.children) : null}
          </TocItem>
        ))}
      </TocList>
    )
  }
  getGithubUrl() {
    return getGithubBaseUrl() + this.props.currentPath + '.md'
  }
  render() {
    if (!this.state.content) {
      return (
        <Wrapper>
          <ListWrapper />
          <Doc url={this.getGithubUrl()} />
        </Wrapper>
      )
    }

    const compiled = compile(this.state.content)
    const currentFileName = this.getFileNameFromUrl()

    return (
      <Wrapper>
        <ListWrapper>
          <List>
            {this.props.apis.map((api) => {
              const fileShortName = api.fileName.replace('.md', '')
              const isSelected = currentFileName === fileShortName

              return (
                <Item key={api.fileName} selected={isSelected}>
                  <a href={`/api/${fileShortName}`}>{api.title}</a>
                  {isSelected && compiled.toc[0].children.length
                    ? this.renderToc(compiled.toc[0].children)
                    : null}
                </Item>
              )
            })}
          </List>
        </ListWrapper>
        <Doc url={this.getGithubUrl()}>{compiled.tree}</Doc>
      </Wrapper>
    )
  }
}

export default Api
