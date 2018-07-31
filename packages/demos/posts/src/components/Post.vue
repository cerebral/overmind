<template>
  <li>
    {{post.title}}
  </li>
</template>
<script>
import { connect } from '../app'

export default connect({
  name: 'Post',
  props: ['post'],
})
</script>