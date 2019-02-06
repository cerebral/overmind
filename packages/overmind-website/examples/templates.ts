const getVersion = () => (location.host.split('.')[0] === 'next' ? '@next' : '')

const views = {
  react: (config) => `
import { Overmind, IConfig } from 'overmind'
import { createHook } from 'overmind-react'
${config.trim()}

// For explicit typing check the Typescript guide
declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const overmind = new Overmind(config)

export const useOvermind = createHook(overmind)
`,
  angular: (config) => `
import { Overmind, IConfig } from 'overmind'
import { createConnect, IConnect } from 'overmind-angular'
${config.trim()}

// For explicit typing check the Typescript guide
declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export interface Connect extends IConnect<typeof config> {}

export const overmind = new Overmind(config)

export const connect = createConnect(overmind) 
`,
  vue: (config) => ``,
}

export const tsAppIndex = (view, config) => views[view](config)

export const getPackageWithVersion = (name) => name + getVersion()
