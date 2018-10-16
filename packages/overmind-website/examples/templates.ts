const getVersion = () => (location.host.split('.')[0] === 'next' ? '@next' : '')

export const tsAppIndex = (view, config) => {
  return `
import Overmind, { TApp } from 'overmind'
import createConnect, { TConnect } from 'overmind-${view}'
${config.trim()}

declare module 'overmind' {
  interface App extends TApp<typeof config> {}
}

const app = new Overmind(config)

export type Connect = TConnect<typeof app>

export const connect = createConnect(app)

export default app
`
}

export const getPackageWithVersion = (name) => name + getVersion()
