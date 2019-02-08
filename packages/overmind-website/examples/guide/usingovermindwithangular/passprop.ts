export default () => [
  {
    fileName: 'components/todo.component.ts',
    code: `
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { OvermindService } from '../overmind'
import { Todo } from '../overmind/state'

@Component({
  selector: 'todos-todo',
  template: \`
<li ngIf="todo$ | async as todo">{{ todo.title }}</li>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@OvermindService.Track
export class TodoComponent {
  @Input() todo: Todo
  constructor(private overmind: OvermindService) {}
}    
    `,
  },
  {
    fileName: 'components/todos.component.ts',
    code: `
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { OvermindService } from '../overmind'

@Component({
  selector: 'todos-list',
  template: \`
<ul *ngIf="state$ | async as state">
  <todos-todo *ngFor="let todo of state.todos;" [todo]="todo"></todos-todo>
</ul>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
@OvermindService.Track
export class ListComponent {
  state$ = this.overmind.select()
  constructor(private overmind: OvermindService)
}
`,
  },
]
