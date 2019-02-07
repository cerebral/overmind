export default () => [
  {
    fileName: 'components/app.component.ts',
    code: `
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { OvermindService } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`\`,
  providers: [OvermindService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@OvermindService.Track
export class AppComponent {
  state$ = this.overmind.select()
  actions: this.overmind.actions
  constructor(private overmind: OvermindService) {}
},
`,
  },
]
