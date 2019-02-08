export default () => [
  {
    fileName: 'components/app.component.ts',
    code: `
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { OvermindService } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
<div *ngIf="state$ | async as state">
  <h1 (click)="actions.changeAdmin()">{{ state.adminTitle }}</h1>
</div>
  \`,
  providers: [OvermindService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@OvermindService.Track
export class AppComponent {
  state$ = this.overmind.select(state => state.admin)
  actions: this.overmind.actions.admin
  constructor(private overmind: OvermindService) {}
},
`,
  },
]
