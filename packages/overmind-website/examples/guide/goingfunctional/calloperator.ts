const javascript = {
  react: [
    {
      fileName: 'components/MyComponent.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

const MyComponent = ({ overmind }) => (
  <button onClick={overmind.actions.functionalAction}>
    Test
  </button>
)

export default connect(MyComponent)
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
}

const typescript = {
  react: [
    {
      fileName: 'components/MyComponent.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../overmind'

type Props = Connect

const MyComponent: React.FunctionComponent<Props> = ({ overmind }) => (
  <button onClick={overmind.actions.functionalAction}>
    Test
  </button>
)

export default connect(MyComponent)
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
