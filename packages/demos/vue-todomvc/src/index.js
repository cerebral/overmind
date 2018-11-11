import Vue from 'vue/dist/vue'
import AddTodo from './components/AddTodo.vue'
import Todos from './components/Todos.vue'
import './styling'

Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  template: `
  <div class="wrapper">
    <div class="wrapper-inner">
      <add-todo></add-todo>
      <todos></todos>
    </div>
  </div>
  `,
  components: { AddTodo, Todos },
})
