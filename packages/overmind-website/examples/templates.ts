const getVersion = () => (location.host.split('.')[0] === 'next' ? '@next' : '')

export const tsAppIndex = (view, config) => `
import { Overmind, TConfig } from 'overmind'
import { TConnect, createConnect } from 'overmind-${view}'
${config.trim()}

// For explicit typing check the Typescript guide
declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

export type Connect = TConnect<typeof config>

export const overmind = new Overmind(config)

export const connect = createConnect(overmind)
`

export const getPackageWithVersion = (name) => name + getVersion()
