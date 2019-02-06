const javascript = {
  react: [
    {
      fileName: 'components/MyComponent.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const MyComponent = () => {
  const { actions } = useOvermind()

  return (
    <button onClick={actions.functionalAction}>
      Test
    </button>
  )
}

export default MyComponent
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/MyComponent.vue (template)',
      target: 'markup',
      code: `
<button @click="actions.functionalAction()">
  Test
</button>
    `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/MyComponent.tsx',
      code: `
import * as React from 'react'
import { useOvermind } from '../overmind'

const MyComponent: React.FunctionComponent = () => {
  const { actions } = useOvermind()

  return (
    <button onClick={actions.functionalAction}>
      Test
    </button>
  )
}

export default MyComponent
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/MyComponent.vue (template)',
      target: 'markup',
      code: `
<button on:click="overmind.actions.functionalAction()">
  Test
</button>
    `,
    },
    {
      fileName: 'components/MyComponent.vue (script)',
      code: `
import { connect } from '../overmind'

export default connect({})
  `,
    },
  ],
  angular: [
    {
      fileName: 'components/grabdata.component.ts',
      code: `
import { Component,Input } from '@angular/core';
import { connect } from '../overmind'

@Component({
  selector: 'grab-data',
  template: \`
  <button (click)="overmind.actions.functionalAction()">
    Test
  </button>
  \`
})
@connect()
export class GrabData {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
