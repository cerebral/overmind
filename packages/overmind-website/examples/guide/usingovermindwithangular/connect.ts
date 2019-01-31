export default () => [
  {
    fileName: 'overmind/index.ts',
    code: `
import { Overmind, IConfig } from 'overmind'
import { createConnect, IConnect } from 'overmind-angular'
import { state } from './state'
import * as actions from './actions'

const config = {
  state,
  actions
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export interface Connect extends IConnect<typeof config> {}

const overmind = new Overmind(config)

export const connect = createConnect(overmind)
`,
  },
  {
    fileName: 'components/app.component.ts',
    code: `
import { Component } from '@angular/core'
import { connect, Connect } from '../overmind'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@connect()
export class AppComponent {
  overmind: Connect
  title = 'My First Angular App with Overmind!'
}
`,
  },
]
