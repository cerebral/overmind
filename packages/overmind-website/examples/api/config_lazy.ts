export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind.ts',
          code: `
import { Overmind, TConfig } from 'overmind'
import { lazy } from 'overmind/config'
import { Config as ModuleAConfig } from './moduleA'
import { Config as ModuleBConfig } from './moduleB'

const config = lazy({
  moduleA: (): Promise<ModuleAConfig> => import('./moduleA'),
  moduleB: (): Promise<ModuleBConfig> => import('./moduleB')
})

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

const overmind = new Overmind(config)

overmind.actions.lazy.loadConfig('moduleA')

export default overmind
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { Overmind } from 'overmind'
import { lazy } from 'overmind/config'

const config = lazy({
  moduleA: () => import('./moduleA'),
  moduleB: () => import('./moduleB')
})

const overmind = new Overmind(config)

overmind.actions.lazy.loadConfig('moduleA')

export default overmind
`,
        },
      ]
