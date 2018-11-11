<template>
  <ul class="todos-list">
    <todo v-for="todo in app.state.todos" v-bind:key="todo.id" v-bind:todo="todo" />
  </ul>
</template>
<script>
import { connect } from '../app'
import Todo from './Todo.vue'

export default connect({
  name: 'Todos',
  components: {
    Todo,
  },
})
</script>