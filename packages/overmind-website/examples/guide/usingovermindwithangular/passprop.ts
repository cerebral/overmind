export default () => [
  {
    fileName: 'components/todo.component.ts',
    code: `
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { OvermindService } from '../overmind'
import { Todo } from '../overmind/state'

@Component({
  selector: 'todos-todo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
<li ngIf="todo$ | async as todo">{{ todo.title }}</li>
  \`
})
@connect()
export class TodoComponent {
  @Input() index: number
  todo$ = this.overmind.select(state => state.todos[this.index])
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
  <todos-todo
    *ngFor="let todo of state.todos; index as i;"
    [index]="i"
  ></todos-todo>
</ul>
  \`
})
export class ListComponent {
  state$ = this.overmind.select()
  constructor(private overmind: OvermindService)
}
`,
  },
]
