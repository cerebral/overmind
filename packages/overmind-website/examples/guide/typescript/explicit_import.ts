export default () => [
  {
    fileName: 'overmind/actions.ts',
    code: `
import { Action } from './'

const doThis: Action = () => {}
        `,
  },
  {
    fileName: 'overmind/someNamespace/actions.ts',
    code: `
import { Action } from '../'

const doThis: Action = () => {}
        `,
  },
]
