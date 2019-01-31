export default () => [
  {
    code: `
import { createOvermindMock } from 'overmind'
import { config } from './'

test('should get items', async () => {
  const overmind = createOvermindMock(config, {
    api: {
      fetchItems: () => Promise.resolve([{ id: 0, title: "foo" }])
    }
  })

  const mutations = await overmind.actions.getItems()
  
  expect(mutations).toMatchSnapshot()
})
`,
  },
]
