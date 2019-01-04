export default () => [
  {
    fileName: 'overmind/effects.test.ts',
    code: `
import * as effects from './effects'

describe('Effects', () => {
  describe('Api', () => {
    test('should get a post', async () => {
      expect.assertions(3)
      const api = new effects.Api({
        get(url, config) {
          expect(url).toBe('/test/posts/1')
          expect(config).toEqual({
            headers: {
              'Auth-Token': '123'
            }
          })
          
          return Promise.resolve({
            response: {
              id
            }
          })
        }
      }, {
        authToken: '123',
        baseUrl: '/test'
      })

      const post = await api.getPost('1')

      expect(post.id).toBe('1')
    })
  })
})
    `,
  },
]
