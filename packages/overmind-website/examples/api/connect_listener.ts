const javascript = {
  react: [
    {
      fileName: 'SomeComponent.js',
      code: `
import React from 'react'
import { connect } from '../app'

class SomeComponent extends React.Component {
  componentDidMount() {
    const overmind = this.props.overmind

    this.disposeMutationListener = overmind.addMutationListener((mutation) => {
      // Check mutation and do something
    })
  }
  componentWillUnmount() {
    this.disposeMutationListener()
  }
  render() {
    const overmind = this.props.overmind
    
    return (
      <div onClick={overmind.actions.onClick}>
        {overmind.state.foo}
      </div>
    )
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
<div v-on:click="overmind.actions.onClick">
  {{overmind.state.foo}}
</div>
    `,
    },
    {
      fileName: 'SomeComponent.vue (script)',
      code: `
import { connect } from '../app'

export default connect({
  mounted() {
    this.disposeMutationListener = this.overmind.addMutationListener((mutation) => {
      // Check mutation and do something
    })
  },
  beforeDestroy() {
    this.disposeMutationListener()
  }
})
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'SomeComponent.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

type Props = {} & Connect

class SomeComponent extends React.Component<Props> {
  disposeMutationListener: () => void
  componentDidMount() {
    const overmind = this.props.overmind

    this.disposeMutationListener = overmind.addMutationListener((mutation) => {
      // Check mutation and do something
    })
  }
  componentWillUnmount() {
    this.disposeMutationListener()
  }
  render() {
    const overmind = this.props.overmind
    
    return (
      <div onClick={overmind.actions.onClick}>
        {overmind.state.foo}
      </div>
    )
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
  <div (click)="overmind.actions.onClick()">
    {{overmind.state.foo}}
  </div>
  \`
})
@connect()
export class SomeComponent {
  disposeMutationListener: () => void
  ngOnInit() {
    this.disposeMutationListener = this.overmind.addMutationListener((mutation) => {
      // Check mutation and do something
    })
  }
  ngOnDestroy() {
    this.disposeMutationListener()
  }
}    
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
