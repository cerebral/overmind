export default () => [
  {
    fileName: 'components/app.component.ts',
    code: `
import { Component } from '@angular/core'
import { connect, Connect } from '../overmind'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
@connect()
export class AppComponent {
  overmind: Connect
  disposeMutationListener: () => void
  ngOnInit() {
    this.disposeMutationListener = this.overmind.addMutationListener((mutation) => {
      if (mutation.path === 'currentPage') {
        document.querySelector('#app').scrollTop = 0
      }
    })
  }
  ngOnDestroy() {
    this.disposeMutationListener()
  }
}
`,
  },
]
