export default () => [
  {
    fileName: 'components/admin.component.ts',
    code: `
import { Component } from '@angular/core'
import { connect } from '../overmind'

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
@connect(({ state, actions, effects }) => ({
  state: state.admin,
  actions: actions.admin
}))
export class AdminComponent {}
`,
  },
]
