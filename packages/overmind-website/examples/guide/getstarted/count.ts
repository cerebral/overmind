const javascript = {
  react: [
    {
      fileName: 'Count.js',
      target: 'jsx',
      code: `
import React from 'react'

const Count = () => {
  return (
    <div>
      {state.count}
    </div>
  )
}

export default Count
    `,
    },
  ],
  vue: [
    {
      fileName: 'Count.vue (template)',
      target: 'markup',
      code: `
<div>
  {{ state.count }}
</div>
    `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/Count.tsx',
      code: `
import * as React from 'react'

const Count: React.FunctionComponent = () => {
  return (
    <div>
      {state.count}
    </div>
  )
}

export default Count
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'count.component.ts',
      code: `
import { Component } from '@angular/core';

@Component({
  selector: 'count-component',
  template: \`
<div>
  {{ state.count }}
</div>
  \`
})
export class CountComponent {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
