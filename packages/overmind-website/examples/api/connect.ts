const javascript = {
  react: [
    {
      fileName: 'SomeComponent.js',
      code: `
import React from 'react'
import { connect } from '../overmind'

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
import { connect } from '../overmind'

export default connect({})
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
import { connect, Connect } from '../overmind'

const SomeComponent: React.FunctionComponent<Connect> = ({ overmind }) => {
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
import { connect } from '../overmind'

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
