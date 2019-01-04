export default () => [
  {
    fileName: 'overmind/actions.test.ts',
    code: `
import * as actions from './actions'

describe('Actions', () => {
  describe('getPost', () => {
    test('should get post with passed id', async () => {
      const state = {}
      const api = {
        getPost(id) {
          return Promise.resolve({
            id
          })
        }
      }

      await actions.getPost('1')

      expect(state.isLoadingPost).toBe(false)
      expect(state.currentPost).toEqual({ id: '1' })
    })
    test('should handle errors', async () => {
      const state = {}
      const api = {
        getPost() {
          throw new Error('test')
        }
      }

      await actions.getPost('1')

      expect(state.isLoadingPost).toBe(false)
      expect(state.error.message).toBe('test')
    })
  })
})
    `,
  },
]
