export default () => [
  {
    fileName: 'components/app.component.ts',
    code: `
import { Component } from '@angular/core'
import { Store } from '../overmind'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  disposeMutationListener: () => void
  constructor (private store: Store) {}
  ngOnInit() {
    this.disposeMutationListener = this.store.addMutationListener((mutation) => {
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
