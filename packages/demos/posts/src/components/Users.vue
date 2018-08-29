<template>
  <div>Hello users!</div>
</template>
<script>
import app from '../app'

export default app.connect({
  name: 'Users',
})
</script>