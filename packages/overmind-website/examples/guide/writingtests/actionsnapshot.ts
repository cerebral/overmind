export default () => [
  {
    fileName: 'overmind/actions.test.ts',
    code: `
import { createMock } from 'overmind'
import { config } from './'

describe('Actions', () => {
  describe('getPost', () => {
    test('should get post with passed id', async () => {
      const mock = createMock(config, {
        api: {
          getPost(id) {
            return Promise.resolve({
              id
            })
          }
        }
      })

      const mutations = await actions.getPost('1')

      expect(mutations).toMatchSnapshot()
    })
    test('should handle errors', async () => {
      const mock = createMock(config, {
        api = {
          getPost() {
            throw new Error('test')
          }
        }
      })

      const mutations = await actions.getPost('1')

      expect(mutations).toMatchSnapshot()
    })
  })
})
    `,
  },
]
