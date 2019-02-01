export default () => [
  {
    fileName: 'components/Todo.vue (template)',
    target: 'markup',
    code: `
<li>{{ todo.title }}</li>
`,
  },
  {
    fileName: 'components/Todo.vue (script)',
    code: `
export default {
  props: ["todo"]
}
`,
  },
  {
    fileName: 'components/Todos.vue (template)',
    target: 'markup',
    code: `
<ul>
  <todo-component
    v-for="post in state.postsList"
    :todo="todo"
    :key="todo.id"
  ></todo-component>
</ul>
`,
  },
  {
    fileName: 'components/Todos.vue (script)',
    code: `
import TodoComponent from './Todo'

export default {
  components: {
    TodoComponent
  }
}
`,
  },
]
