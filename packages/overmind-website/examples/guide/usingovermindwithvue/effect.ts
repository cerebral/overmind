export default () => [
  {
    fileName: 'components/SomeComponent.vue (template)',
    code: `
<div v-on:click="overmind.actions.onClick">
  {{overmind.state.foo}}
</div>
`,
  },
  {
    fileName: 'components/SomeComponent.vue (script)',
    code: `
import { connect } from '../overmind'

export default connect({
  mounted() {
    this.disposeMutationListener = this.overmind.addMutationListener((mutation) => {
      if (mutation.path === 'currentPage') {
        document.querySelector('#app').scrollTop = 0
      }
    })
  },
  destroyed() {
    this.disposeMutationListener()
  }
})
`,
  },
]
