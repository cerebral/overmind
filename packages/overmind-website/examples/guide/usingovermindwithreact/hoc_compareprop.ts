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
  shouldComponentUpdate(nextProps: Props) {
    return this.props.overmind !== nextProps.overmind
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
  shouldComponentUpdate(nextProps) {
    return this.props.overmind !== nextProps.overmind
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
