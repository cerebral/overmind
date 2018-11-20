export default () => [
  {
    code: `
import { TConfig } from 'overmind'

const config = {}

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}
        `,
  },
]
