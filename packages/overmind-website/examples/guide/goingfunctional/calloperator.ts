const javascript = {
  react: [
    {
      fileName: 'components/MyComponent.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const SearchComponent = () => {
  const { state, actions } = useOvermind()

  return (
    <input
      value={state.query}
      onChange={(event) => actions.search(event.currentTarget.value)}
    />
  )
}

export default SearchComponent
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/SearchComponent.vue (template)',
      target: 'markup',
      code: `
<input :value="state.query" @change="actions.search($event.currentTarget.value)" />
    `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/SearchComponent.tsx',
      code: `
import * as React from 'react'
import { useOvermind } from '../overmind'

const SearchComponent: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()

  return (
    <input
      value={state.query}
      onChange={(event) => actions.search(event.currentTarget.value)}
    />
  )
}

export default SearchComponent
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/search.component.ts',
      code: `
import { Component,Input } from '@angular/core';
import { Store } from '../overmind'

@Component({
  selector: 'search-component',
  template: \`
<div *track>
  <input [value]="state.query" (change)="actions.search($event.currentTarget.value)" />
</div>
  \`
})
export class SearchComponent {
  state = this.store.select()
  actions = this.store.action
  constructor(private store: Store) {}
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
