export default () => [
  {
    fileName: 'overmind/actions.test.ts',
    code: `
import { createOvermindMock } from 'overmind'
import { config } from './'

describe('Actions', () => {
  describe('onInitialize', () => {
    test('should initialize with local storage theme', async () => {
      const overmind = createOvermindMock(config, {
        localStorage: {
          getTheme() {
            return 'awesome' 
          }
        }
      })

      await overmind.onInitialize()

      expect(overmind.state.theme).toEqual('awesome')
    })
  })
})
    `,
  },
]
