export default (ts) =>
  ts
    ? [
        {
          fileName: 'components/App.tsx',
          code: `
import * as React from 'react'
import { connect, Connect } from '../overmind'

type Props = {} & Connect

class App extends React.Component<Props> {
  disposeMutationListener: () => void
  componentDidMount() {
    this.disposeMutationListener = this.props.overmind.addMutationListener((mutation) => {
      if (mutation.path === 'currentPage') {
        document.querySelector('#app').scrollTop = 0
      }
    })
  }
  componentWillUnmount() {
    this.disposeMutationListener()
  }
  render() {
    const { state, actions } = this.props.overmind

    return <div />
  }
}

export default connect(App)
`,
        },
      ]
    : [
        {
          fileName: 'components/App.jsx',
          code: `
import React from 'react'
import { connect } from '../overmind'

class App extends React.Component {
  componentDidMount() {
    this.disposeMutationListener = this.props.overmind.addMutationListener((mutation) => {
      if (mutation.path.includes('currentPage')) {
        document.querySelector('#app').scrollTop = 0
      }
    })
  }
  componentWillUnmount() {
    this.disposeMutationListener()
  }
  render() {
    const { state, actions } = this.props.overmind

    return <div />
  }
}

export default connect(App)
`,
        },
      ]
