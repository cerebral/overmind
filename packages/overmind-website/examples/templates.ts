const getVersion = () => (location.host.split('.')[0] === 'next' ? '@next' : '')

export const tsAppIndex = (view, config) => {
  if (view === 'components') {
    return `
import { Overmind, TConfig } from 'overmind'
${config.trim()}

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

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

export type Connect = TConnect<typeof config>

export const overmind = new Overmind(config)

export const connect = createConnect(overmind)

export default overmind
`
}

export const getPackageWithVersion = (name) => name + getVersion()
