const javascript = {
  react: [
    {
      fileName: 'components/SomeComponent.js',
      code: `
import React from 'react'
import app from '../app'

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

export default app.connect(SomeComponent)
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
import app from '../app'

export default app.connect({
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

export default app.connect(SomeComponent)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'some.component.ts',
      code: `
import { Component } from '@angular/core';
import app from '../app'

@Component({
  selector: 'some-component',
  template: \`
  <h1>foo</h1>
  \`
})
@app.connect()
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
