export default () => [
  {
    fileName: 'overmind/index.jsx',
    code: `
import { createOvermind } from 'overmind'
import { createConnect } from 'overmind-vue'

const overmind = createOvermind({
  state: {},
  actions: {}
})

export const connect = createConnect(overmind)
`,
  },
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
import { connect } from '../overmind'

export default connect({
  props: ["todo"]
})
`,
  },
  {
    fileName: 'components/Todos.vue (template)',
    target: 'markup',
    code: `
<ul>
  <todo-component
    v-for="post in overmind.state.postsList"
    :todo="todo"
    :key="todo.id"
  />
</ul>
`,
  },
  {
    fileName: 'components/Todos.vue (script)',
    code: `
import { connect } from '../overmind'
import TodoComponent from './Todo'

export default connect({
  components: {
    TodoComponent
  }
})
`,
  },
]
