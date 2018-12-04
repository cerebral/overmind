export default (ts) =>
  ts
    ? [
        {
          fileName: 'app.ts',
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

const app = new Overmind(config)

app.actions.lazy.loadConfig('moduleA')

export default app
`,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import { Overmind } from 'overmind'
import { lazy } from 'overmind/config'

const config = lazy({
  moduleA: () => import('./moduleA'),
  moduleB: () => import('./moduleB')
})

const app = new Overmind(config)

app.actions.lazy.loadConfig('moduleA')

export default app
`,
        },
      ]
