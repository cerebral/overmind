<template>
  <div class="todos-wrapper">
    <form v-on:submit="app.actions.addTodo">
      <input
        placeholder="I need to..."
        v-bind:value="app.state.newTodoTitle"
        v-on:input="app.actions.changeNewTodoTitle"
      />
      <button v-bind:disabled="app.state.newTodoTitle == ''">add</button>
    </form>
  </div>
</template>
<script>
import { connect } from '../app'

export default connect({
  name: 'AddTodo',
})
</script>