export default () => [
  {
    fileName: 'overmind/index.ts',
    code: `
import { IConfig } from 'overmind'
import { Injectable } from '@angular/core'
import { OvermindService } from 'overmind-angular'
import { state } from './state'
import * as actions from './actions'

export const config = { state, actions }

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
import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule, OvermindModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: OVERMIND_INSTANCE, useValue: createOvermind(config) },
    { provide: Store, useExisting: OvermindService }
]
})
export class AppModule { }   
`,
  },
  {
    fileName: 'components/app.component.ts',
    code: `
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
<div *track>
  <h1 (click)="actions.changeTitle()">{{ state.title }}</h1>
</div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  state = this.store.select()
  actions = this.store.actions
  constructor(private store: Store) {}
},
`,
  },
]
