const javascript = {
  react: [
    {
      fileName: 'overmind/index.js',
      code: `
import { createHook } from 'overmind-react'
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export const config = {
  state,
  actions,
  effects
}

export const useOvermind = createHook()
`,
    },
    {
      fileName: 'index.js',
      code: `
import React from 'react'
import { render } from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import Count from './Count'

const overmind = createOvermind(config)

render((
  <Provider value={overmind}>
    <Count />
  </Provider>
), document.querySelector('#app'))
`,
    },
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
      <button onClick={() => actions.decreaseCount()}>-</button>
      {state.count}
      <button onClick={() => actions.increaseCount()}>+</button>
    </div>
  )
}

export default Count
    `,
    },
  ],
  vue: [
    {
      fileName: 'index.js',
      code: `
import Vue from 'vue'
import { createOvermind } from 'overmind'
import { createPlugin } from 'overmind-vue'
import { config } from './overmind'
import Count from './components/Count'

const overmind = createOvermind(config)
const OvermindPlugin = createPlugin(overmind)

Vue.use(OvermindPlugin)

new Vue({
  el: '#app',
  render: (h) => h(Count),
})

`,
    },
    {
      fileName: 'components/Count.vue (template)',
      target: 'markup',
      code: `
<div>
  <button @click="actions.decreaseCount()">-</button>
  {{ state.count }}
  <button @click="actions.increaseCount()">+</button>
</div>
    `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'overmind/index.ts',
      code: `
import { IConfig } from 'overmind'
import { createHook } from 'overmind-react'
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export const config = {
  state,
  actions,
  effects
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()
`,
    },
    {
      fileName: 'index.tsx',
      code: `
import React from 'react'
import { render } from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import Count from './Count'

const overmind = createOvermind(config)

render((
  <Provider value={overmind}>
    <Count />
  </Provider>
), document.querySelector('#app'))
`,
    },
    {
      fileName: 'components/Count.tsx',
      code: `
import * as React from 'react'
import { useOvermind } from '../overmind'

const Count: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()

  return (
    <div>
      <button onClick={() => actions.decreaseCount()}>-</button>
      {state.count}
      <button onClick={() => actions.increaseCount()}>+</button>
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
      fileName: 'overmind/index.ts',
      code: `
import { IConfig } from 'overmind'
import { Injectable } from '@angular/core'
import { OvermindService } from 'overmind-angular'
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export const config = { state, actions, effects }

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

@Injectable()
export class Store extends OvermindService<typeof config> {}
`,
    },
    {
      fileName: 'app.module.ts',
      code: `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createOvermind } from 'overmind';
import { OvermindModule, OvermindService, OVERMIND_INSTANCE } from 'overmind-angular'

import { config, Store } from './overmind'
import { CountComponent } from './count.component';

@NgModule({
  imports: [ BrowserModule, OvermindModule ],
  declarations: [ CountComponent ],
  bootstrap: [ CountComponent ],
  providers: [
    { provide: OVERMIND_INSTANCE, useValue: createOvermind(config) },
    { provide: Store, useExisting: OvermindService }
  ]
})
export class AppModule { }
`,
    },
    {
      fileName: 'count.component.ts',
      code: `
import { Component } from '@angular/core';
import { Store } from '../overmind'

@Component({
  selector: 'count-component',
  template: \`
<div *track>
  <button (click)="actions.decreaseCount()">-</button>
  {{ state.count }}
  <button (click)="actions.increaseCount()">+</button>
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
