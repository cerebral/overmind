export default () => [
  {
    fileName: 'components/SomeComponent.vue (template)',
    target: 'markup',
    code: `
<div @click="overmind.actions.onClick">
  {{ overmind.state.foo }}
</div>
`,
  },
  {
    fileName: 'components/SomeComponent.vue (script)',
    code: `
import { connect } from '../overmind'

export default connect({
  mounted() {
    this.disposeReaction = this.overmind.reaction(
      ({ currentPage }) => currentPage,
      () => document.querySelector('#app').scrollTop = 0
    )
  },
  destroyed() {
    this.disposeReaction()
  }
})
`,
  },
]
