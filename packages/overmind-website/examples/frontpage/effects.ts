export default () => [
  {
    code: `
import axios from 'axios'

export const api = {
  getItems() {
    return axios.get('/api/items')
  }
}
`,
  },
]
