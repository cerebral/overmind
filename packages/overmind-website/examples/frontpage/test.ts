export default () => [
  {
    code: `
import { createMock } from 'overmind'
import { config } from './'

test('should get items', async () => {
  const mock = createMock(config, {
    api: {
      getItems: () => Promise.resolve([{ id: 0, title: "foo" }])
    }
  })

  const mutations = await actions.getItems()
  
  expect(mutations).toMatchSnapshot()
})
`,
  },
]
