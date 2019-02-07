export default () => [
  {
    fileName: 'overmind/index.ts',
    code: `
import { Overmind, IConfig } from 'overmind'
import { createService } from 'overmind-angular'
import { Injectable } from '@angular/core'
import { state } from './state'
import * as actions from './actions'

const config = {
  state,
  actions
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

const overmind = new Overmind(config)

@Injectable()
export class OvermindService extends createService(overmind) {}
`,
  },
  {
    fileName: 'components/app.component.ts',
    code: `
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { OvermindService } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
<div *ngIf="state$ | async as state">
  <h1 (click)="actions.changeTitle()">{{ state.title }}</h1>
</div>
  \`,
  providers: [OvermindService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  state$ = this.overmind.select()
  actions: this.overmind.actions
  constructor(private overmind: OvermindService) {}
},
`,
  },
]
