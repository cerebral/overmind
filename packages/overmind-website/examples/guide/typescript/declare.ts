export default () => [
  {
    code: `
import { IConfig } from 'overmind'

const config = {}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}
        `,
  },
]
