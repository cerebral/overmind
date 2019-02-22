export default () => [
  {
    fileName: 'components/SomeComponent.vue (template)',
    target: 'markup',
    code: `
<div @click="actions.onClick">
  {{ state.foo }}
</div>
`,
  },
  {
    fileName: 'components/SomeComponent.vue (script)',
    code: `
export default {
  name: 'SomeComponent',
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
}
`,
  },
]
