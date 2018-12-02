const javascript = {
  components: [
    {
      fileName: 'SomeComponent.js',
      code: `
import { h, useOvermind } from 'overmind-components'

const SomeComponent = () => {
  const { state, actions } = useOvermind()

  return (
    <div onClick={actions.onClick}>
      {state.foo}
    </div>
  )
}

export default SomeComponent
    `,
    },
  ],
  react: [
    {
      fileName: 'SomeComponent.js',
      code: `
import React from 'react'
import { connect } from '../app'

const SomeComponent = ({ overmind }) => {
  return (
    <div onClick={overmind.actions.onClick}>
      {overmind.state.foo}
    </div>
  )
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

export default connect({})
  `,
    },
  ],
}

const typescript = {
  components: [
    {
      fileName: 'SomeComponent.tsx',
      code: `
import { h, Component, useOvermind } from 'overmind-components'

const SomeComponent: Component = () => {
  const { state, actions } = useOvermind()

  return (
    <div onClick={actions.onClick}>
      {state.foo}
    </div>
  )
}

export default SomeComponent
    `,
    },
  ],
  react: [
    {
      fileName: 'SomeComponent.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const SomeComponent: React.SFC<Connect> = ({ overmind }) => {
  return (
    <div onClick={overmind.actions.onClick}>
      {overmind.state.foo}
    </div>
  )
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
export class SomeComponent {}    
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
