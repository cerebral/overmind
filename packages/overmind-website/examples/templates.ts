const getVersion = () => (location.host.split('.')[0] === 'next' ? '@next' : '')

const views = {
  react: (config) => `
import { IConfig } from 'overmind'
import { createHook } from 'overmind-react'
${config.trim()}

// For explicit typing check the Typescript guide
declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()
`,
  angular: (config) => `
import { IConfig } from 'overmind'
import { OvermindService } from 'overmind-angular'
import { Injectable } from '@angular/core'
${config.trim()}

// For explicit typing check the Typescript guide
declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

@Injectable()
export class Store extends OvermindService<typeof config> {}
`,
  vue: (config) => ``,
}

const simple = (config) => `
import { IConfig } from 'overmind'
${config.trim()}

// For explicit typing check the Typescript guide
declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}
`

export const tsAppIndex = (view, config) => views[view](config)

export const tsSimpleAppIndex = (config) => simple(config)

export const getPackageWithVersion = (name) => name + getVersion()
