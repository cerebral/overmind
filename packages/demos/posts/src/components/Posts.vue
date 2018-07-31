<template>
  <ul>
    <li><button v-on:click="app.actions.posts.loadPost">Load post</button></li>
    <li is="Post" v-bind:key="post.id" v-for="post in app.state.posts.list" v-bind:post="post" />
</ul>
</template>
<script>
import { connect } from '../app'
import Post from './Post.vue'

export default connect({
  name: 'Posts',
  components: {
    Post,
  },
})
</script>