export default () => [
  {
    fileName: 'components/SomeComponent.vue (template)',
    target: 'markup',
    code: `
<div @click="actions.someAdminAction">
  {{ state.someAdminState }}
</div>
`,
  },
  {
    fileName: 'components/SomeComponent.vue (script)',
    code: `
import { connect } from '../overmind'

const Component = {}

export default connect(({ state, actions, effects }) => ({
  state: state.admin,
  actions: actions.admin
}), Component)
`,
  },
]
