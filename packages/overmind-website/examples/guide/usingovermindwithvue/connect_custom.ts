export default () => [
  {
    fileName: 'components/SomeComponent.vue (template)',
    code: `
<div v-on:click="actions.someAdminAction">
  {{state.someAdminState}}
</div>
`,
  },
  {
    fileName: 'components/SomeComponent.vue (script)',
    code: `
import { connect } from '../overmind'

export default connect(({ state, actions, effects }) => ({
  state: state.admin,
  actions: actions.admin
}), {})
`,
  },
]
