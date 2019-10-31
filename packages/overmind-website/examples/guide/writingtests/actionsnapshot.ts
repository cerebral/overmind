export default () => [
  {
    fileName: 'overmind/actions.test.ts',
    code: `
import { createOvermindMock } from 'overmind'
import { config } from './'

describe('Actions', () => {
  describe('getPost', () => {
    test('should get post with passed id', async () => {
      const overmind = createOvermindMock(config, {
        api: {
          getPost(id) {
            return Promise.resolve({
              id
            })
          }
        }
      })

      await overmind.actions.getPost('1')

      expect(overmind.mutations).toMatchSnapshot()
    })
    test('should handle errors', async () => {
      const overmind = createOvermindMock(config, {
        api: {
          getPost() {
            throw new Error('test')
          }
        }
      })

      await overmind.actions.getPost('1')

      expect(overmind.mutations).toMatchSnapshot()
    })
  })
})
    `,
  },
]
