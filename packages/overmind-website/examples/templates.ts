const getVersion = () => (location.host.split('.')[0] === 'next' ? '@next' : '')

export const tsAppIndex = (view, config) => `
import { Overmind, IConfig } from 'overmind'
import { createConnect, IConnect } from 'overmind-${view}'
${config.trim()}

// For explicit typing check the Typescript guide
declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export interface Connect extends IConnect<typeof config> {}

export const overmind = new Overmind(config)

export const connect = createConnect(overmind)
`

export const getPackageWithVersion = (name) => name + getVersion()
