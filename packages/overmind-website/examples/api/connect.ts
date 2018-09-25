const javascript = {
  react: [
    {
      fileName: 'SomeComponent.js',
      code: `
import React from 'react'
import { connect } from '../app'

const SomeComponent = ({ app }) => {
  return (
    <div onClick={app.actions.onClick}>
      {app.state.foo}
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
<div v-on:click="app.actions.onClick">
  {{app.state.foo}}
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
  react: [
    {
      fileName: 'SomeComponent.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const SomeComponent: React.SFC<Connect> = ({ app }) => {
  return (
    <div onClick={app.actions.onClick}>
      {app.state.foo}
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
  <div (click)="app.actions.onClick()">
    {{app.state.foo}}
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
