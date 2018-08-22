<template>
  <li>
    {{post.title}}
  </li>
</template>
<script>
import app from '../app'

export default app.connect({
  name: 'Post',
  props: ['post'],
})
</script>