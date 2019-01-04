export default () => [
  {
    fileName: 'overmind/operators.test.ts',
    code: `
import * as operators from './operators'

describe('Operators', () => {
  describe('filterAwesomeUser', () => {
    test('should pass through awesome users', () => {
      let ranNext = false
      let ranComplete = false

      const user = {
        isAwesome: true
      }
      
      operators.filterAwesomeUser(null, {
        value: user
      }, () => {
        ranNext = true
      }, () => {
        ranComplete = true
      })

      expect(ranNext).toBe(true)
      expect(ranComplete).toBe(false)
    })
    test('should filter out lame users', () => {
      let ranNext = false
      let ranComplete = false

      const user = {
        isAwesome: false
      }
      
      operators.filterAwesomeUser(null, {
        value: user
      }, () => {
        ranNext = true
      }, () => {
        ranComplete = true
      })

      expect(ranNext).toBe(false)
      expect(ranComplete).toBe(true)
    })
  })
})
    `,
  },
]
