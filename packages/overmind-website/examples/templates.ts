const getVersion = () => (location.host.split('.')[0] === 'next' ? '@next' : '')

export const tsAppIndex = (view, config) => {
  if (view === 'components') {
    return `
import { Overmind, TConfig } from 'overmind'
import { TComponent } from 'overmind-components'
${config.trim()}

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

export type Component<Props = {}> = TComponent<typeof config, Props>

export default new Overmind(config)
    `
  }
  return `
import { Overmind, TConfig } from 'overmind'
import { TConnect, createConnect } from 'overmind-${view}'
${config.trim()}

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

export const app = new Overmind(config)

export type Connect = TConnect<typeof app>

export const connect = createConnect(app)
`
}

export const getPackageWithVersion = (name) => name + getVersion()
