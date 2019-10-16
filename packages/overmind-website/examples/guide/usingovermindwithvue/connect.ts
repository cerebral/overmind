export default () => [
  {
    fileName: 'overmind/index.jsx',
    code: `
import { createOvermind } from 'overmind'
import { createConnect } from 'overmind-vue'

const overmind = createOvermind({
  state: {},
  actions: {}
})

export const connect = createConnect(overmind)
`,
  },
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

const Component = {}

export default connect(Component)
`,
  },
]
