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
  disposeReaction: () => void
  constructor (private store: Store) {}
  ngOnInit() {
    this.disposeReaction = this.store.reaction(
      ({ currentPage }) => currentPage,
      () => document.querySelector('#app').scrollTop = 0
    )
  }
  ngOnDestroy() {
    this.disposeReaction()
  }
}
`,
  },
]
