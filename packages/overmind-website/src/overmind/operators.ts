import { Operator, action } from 'overmind'
import { RouteContext } from './types'

export const ensureViewAndTypescript: <T extends object>() => Operator<
  RouteContext<T>
> = () =>
  action(({ value: routeContext, state, effects }) => {
    if (
      state.typescript !== JSON.parse(routeContext.query.typescript) ||
      state.theme !== routeContext.query.view
    ) {
      state.typescript = routeContext.query.typescript === 'true'
      state.theme = routeContext.query.view

      effects.storage.set('theme', state.theme)
      effects.storage.set('typescript', state.typescript)
      effects.css.changePrimary(state.theme)
    }
  })
