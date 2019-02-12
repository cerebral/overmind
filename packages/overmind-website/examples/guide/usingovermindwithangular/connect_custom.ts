export default () => [
  {
    fileName: 'components/app.component.ts',
    code: `
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
<div *track>
  <h1 (click)="actions.changeAdminTitle()">{{ state.adminTitle }}</h1>
</div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  state = this.store.select(state => state.admin)
  actions: this.store.actions.admin
  constructor(private store: Store) {}
},
`,
  },
]
