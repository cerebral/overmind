export default () => [
  {
    fileName: 'components/app.component.ts',
    code: `
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { connect, Connect } from '../overmind'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@connect()
export class AppComponent {
  overmind: Connect
  constructor(private cdr: ChangeDetectorRef) {}
}
`,
  },
]
