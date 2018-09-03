export const react = [
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
]

export const reactTs = [
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
]

export const vue = [
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
]

export const vueTs = vue

export const angularTs = [
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
  constructor(private cdr: ChangeDetectorRef) {
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
]
