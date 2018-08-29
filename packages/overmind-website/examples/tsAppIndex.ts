export default (view, config) => `
import App, { TConnect } from '${view}'
${config.trim()}

declare module 'overmind' {
  interface IState extends TState<typeof config> {}
  interface IEffects extends TEffects<typeof config> {}
}

const app = new App(main)

export type Connect = TConnect<typeof app>

export default app
`
