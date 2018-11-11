<template>
  <li class="todo" v-on:click="app.actions.toggleCompleted(todo)">
        <button class="todo-completed" v-bind:class="{'todo-completed-complete': todo.completed }">
          ✔
        </button>
        {{todo.title}}
      </li>
</template>
<script>
import { connect } from '../app'

export default connect({
  name: 'Todo',
  props: ['todo'],
})
</script>