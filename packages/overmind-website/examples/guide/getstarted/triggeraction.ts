const javascript = {
  react: [
    {
      fileName: 'Count.js',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const Count = () => {
  const { state, actions } = useOvermind()

  return (
    <div>
      <button onClick={() => actions.changeCount(-1)}>-1</button>
      {state.count}
      <button onClick={() => actions.changeCount(1)}>+1</button>
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
  <button @click="actions.changeCount(-1)">-1</button>
  {{ state.count }}
  <button @click="actions.changeCount(1)">+1</button>
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
import { useOvermind } from '../overmind'

const Count: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()

  return (
    <div>
      <button onClick={() => actions.changeCount(-1)}>-1</button>
      {state.count}
      <button onClick={() => actions.changeCount(1)}>+1</button>
    </div>
  )
}

export default Posts
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'count.component.ts',
      code: `
import { Component } from '@angular/core';
import { Store } from '../overmind'

@Component({
  selector: 'count-component',
  template: \`
<div *track>
  <button (click)="actions.changeCount(-1)">-1</button>
  {{ state.count }}
  <button (click)="actions.changeCount(1)">+1</button>
</div>
  \`
})
export class CountComponent {
  state = this.store.select()
  actions = this.store.actions
  constructor (private store: Store) {}
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
