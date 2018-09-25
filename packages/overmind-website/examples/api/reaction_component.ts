const javascript = {
  react: [
    {
      fileName: 'components/SomeComponent.js',
      code: `
import React from 'react'
import { connect } from '../app'

class SomeComponent extends React.Component {
  componentDidMount () {
    this.props.app.reaction(
      'scrollUpOnNotification',
      state => state.notifications,
      () => {
        window.scrollTop = 0
      }
    )
  }
  render () {
    return <h1>foo</h1>
  }
}

export default connect(SomeComponent)
    `,
    },
  ],
  vue: [
    {
      fileName: 'SomeComponent.vue (template)',
      code: `
<h1>foo</h1>
    `,
    },
    {
      fileName: 'SomeComponent.vue (script)',
      code: `
import { connect } from '../app'

export default connect({
  mounted() {
    this.app.reaction(
      'scrollUpOnNotification',
      state => state.notifications,
      () => {
        window.scrollTop = 0
      }
    )  
  }
})
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/SomeComponent.tsx',
      code: `
import React from 'react'
import app, { Connect } from '../app'

class SomeComponent extends React.Component<Connect, {}> {
  componentDidMount () {
    this.props.app.reaction(
      'scrollUpOnNotification',
      state => state.notifications,
      () => {
        window.scrollTop = 0
      }
    )
  }
  render () {
    return <h1>foo</h1>
  }
}

export default connect(SomeComponent)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'some.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../app'

@Component({
  selector: 'some-component',
  template: \`
  <h1>foo</h1>
  \`
})
@connect()
export class SomeComponent {
  constructor() {
    this.app.reaction(
      'scrollUpOnNotification',
      state => state.notifications,
      () => {
        window.scrollTop = 0
      }  
    )
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
