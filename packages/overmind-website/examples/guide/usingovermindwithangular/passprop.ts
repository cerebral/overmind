export default () => [
  {
    fileName: 'components/todo.component.ts',
    code: `
import { Component, Input } from '@angular/core'
import { connect } from '../overmind'
import { Todo } from '../overmind/state'

@Component({
  selector: 'todos-todo',
  template: \`
  <li>{{todo.title}}</li>
  \`
})
@connect()
export class TodoComponent {
  @Input() todo: Todo
}    
    `,
  },
  {
    fileName: 'components/todos.component.ts',
    code: `
import { Component } from '@angular/core'
import { connect } from '../overmind'

@Component({
  selector: 'todos-list',
  template: \`
  <ul>
    <todos-todo
      *ngFor="let todo of overmind.state.todos"
      [todo]="todo"
    ></todos-todo>
  </ul>
  \`
})
@connect()
export class ListComponent {}
`,
  },
]
