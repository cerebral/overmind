export default () => [
  {
    fileName: 'components/SomeComponent.vue (template)',
    target: 'markup',
    code: `
<div>
  {{ title }}
</div>
`,
  },
  {
    fileName: 'components/SomeComponent.vue (script)',
    code: `
export default {
  name: 'SomeComponent',
  props: ["id"],
  data: (self) => ({
    get title() {
      return self.state.titles[self.id]
    }
  })
}
`,
  },
]
