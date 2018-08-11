import * as React from 'react'
import {
  Wrapper,
  Selector,
  Chevron,
  Dropdown,
  Option,
  TSImage,
  TsImageWrapper,
} from './elements'
import * as ReactImage from '../../images/react.png'
import * as VueImage from '../../images/vue.png'
import * as TsImage from '../../images/ts.png'
import * as TsImageGrayscale from '../../images/ts-grayscale.png'
import Icon from '../Icon'
import { getTypescript, getTheme } from '../../utils'

type State = {
  isOpen: boolean
}

type Props = {
  selectedTheme: string
  above?: boolean
}

class ViewSelector extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }
  selector: Node
  onSelectorClick = () => {
    if (this.state.isOpen) {
      document.removeEventListener('click', this.onDocumentClick)
    } else {
      document.addEventListener('click', this.onDocumentClick)
    }

    this.setState((state) => ({
      isOpen: !state.isOpen,
    }))
  }
  onDocumentClick = (event: MouseEvent) => {
    let node = event.target as Node

    while (node.parentNode) {
      if (node === this.selector) {
        return
      }
      node = node.parentNode
    }

    this.onSelectorClick()
  }
  onTsClick(event) {
    event.stopPropagation()
    if (getTypescript()) {
      localStorage.removeItem('typescript')
    } else {
      localStorage.setItem('typescript', 'true')
    }
    window.rerender()
  }
  selectTheme(theme) {
    localStorage.setItem('theme', theme)
    window.rerender()
  }
  render() {
    const { isOpen } = this.state

    const options = {
      react: (
        <React.Fragment>
          <img src={ReactImage} width={25} />React
        </React.Fragment>
      ),
      vue: (
        <React.Fragment>
          <img src={VueImage} width={25} />Vue
        </React.Fragment>
      ),
    }

    return (
      <Wrapper
        onClick={this.onSelectorClick}
        innerRef={(node) => {
          this.selector = node
        }}
      >
        <TsImageWrapper onClick={this.onTsClick}>
          {getTypescript() ? (
            <TSImage src={TsImage} width="20" height="20" />
          ) : (
            <TSImage src={TsImageGrayscale} width="20" height="20" grayscale />
          )}
        </TsImageWrapper>
        <Selector isOpen={isOpen}>
          {options[getTheme()]}
          <Chevron>
            <Icon>chevron-down</Icon>
          </Chevron>
        </Selector>
        {this.state.isOpen ? (
          <Dropdown>
            {Object.keys(options).map((theme) => (
              <Option key={theme} onClick={() => this.selectTheme(theme)}>
                {options[theme]}
              </Option>
            ))}
          </Dropdown>
        ) : null}
      </Wrapper>
    )
  }
}

export default ViewSelector
