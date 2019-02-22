export default () => [
  {
    fileName: 'overmind/index.js',
    code: `
import { createOvermind } from 'overmind'
import { createPlugin } from 'overmind-vue'

const overmind = createOvermind({
  state: {
    foo: 'bar'
  },
  actions: {
    onClick() {}
  }
})

export const OvermindPlugin = createPlugin(overmind)
`,
  },
  {
    fileName: 'index.js',
    code: `
import Vue from 'vue/dist/vue'
import { OvermindPlugin } from './overmind'

Vue.use(OvermindPlugin)

...
`,
  },
  {
    fileName: 'components/SomeComponent.vue (template)',
    target: 'markup',
    code: `
<div @click="actions.onClick">
  {{ state.foo }}
</div>
`,
  },
]
