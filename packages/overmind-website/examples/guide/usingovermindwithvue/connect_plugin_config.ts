export default () => [
  {
    fileName: 'index.js',
    code: `
import Vue from 'vue/dist/vue'
import { OvermindPlugin } from './overmind'

Vue.use(OvermindPlugin, ({ state, actions, effects }) => ({
  admin: state.admin,
  posts: state.posts,
  actions,
  effects
}))

...
`,
  },
  {
    fileName: 'components/SomeComponent.vue (template)',
    target: 'markup',
    code: `
<div @click="actions.onClick">
  {{ admin.foo }} {{ posts.foo }}
</div>
`,
  },
]
