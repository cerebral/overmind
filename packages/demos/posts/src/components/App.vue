<style scoped>
.wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 20px;
  font-family: 'Helvetica Neue';
}
.container {
  min-width: 500px;
}
.tabs {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.tab {
  font-size: 16px;
  cursor: pointer;
}
.tab:hover {
  color: blue;
}
.tab.selected {
  font-weight: bold;
  color: blue;
  cursor: default;
}
</style>
<template>
  <div class="wrapper">
    <div class="container">
      <div class="tabs">
        <div
          class="tab"
          v-bind:class="{selected: app.state.tabs.current === 'posts'}"
          v-on:click="app.actions.tabs.changeTo('posts')"
        >
          Posts
        </div>
        <div
          class="tab" v-bind:class="{selected: app.state.tabs.current === 'users'}"
          v-on:click="app.actions.tabs.changeTo('users')"
        >
          Users
        </div>
      </div>
      <Posts v-if="app.state.tabs.current === 'posts'" />
      <Users v-if="app.state.tabs.current === 'users'" />
    </div>
  </div>
</template>
<script>
import app from '../app'
import Posts from './Posts.vue'
import Users from './Users.vue'

export default app.connect({
  name: 'App',
  components: {
    Posts,
    Users,
  },
})
</script>