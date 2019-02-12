export default () => [
  {
    fileName: 'components/todo.component.ts',
    code: `
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Todo } from '../overmind/state'

@Component({
  selector: 'todos-todo',
  template: \`
<li *track>{{ todo.title }}</li>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo: Todo
}    
    `,
  },
  {
    fileName: 'components/todos.component.ts',
    code: `
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '../overmind'

@Component({
  selector: 'todos-list',
  template: \`
<ul *track>
  <todos-todo *ngFor="let todo of state.todos;" [todo]="todo"></todos-todo>
</ul>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  state = this.store.select()
  constructor(private store: Store) {}
}
`,
  },
]
