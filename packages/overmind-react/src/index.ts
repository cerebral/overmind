import * as React from 'react'

import {
  ENVIRONMENT,
  EventType,
  IContext,
  IReaction,
  MODE_SSR,
  Overmind,
  OvermindMock,
} from 'overmind'

const IS_PRODUCTION = ENVIRONMENT === 'production'
const IS_TEST = ENVIRONMENT === 'test'
const isNode =
  !IS_TEST &&
  typeof process !== 'undefined' &&
  process.title &&
  process.title.includes('node')

export type IReactComponent<P = any> =
  | React.FunctionComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>

function getFiberType(component) {
  if (component.type) {
    // React.memo
    return getFiberType(component.type)
  }
  // React.forwardRef
  return component.render || component
}

// Inspired from https://github.com/facebook/react/blob/master/packages/react-devtools-shared/src/backend/renderer.js
function getDisplayName(component): string {
  const type = getFiberType(component)
  return type.displayName || type.name || 'Anonymous'
}

function throwMissingContextError() {
  throw new Error(
    'The Overmind hook could not find an Overmind instance on the context of React. Please make sure you use the Provider component at the top of your application and expose the Overmind instance there. Please read more in the React guide on the website'
  )
}

const context = React.createContext<Overmind<any>>({} as Overmind<any>)
let nextComponentId = 0

export const Provider: React.ProviderExoticComponent<
  React.ProviderProps<Overmind<any> | OvermindMock<any>>
> = context.Provider

function useForceRerender() {
  const [flushId, forceRerender] = React.useState(-1)

  return {
    flushId,
    forceRerender,
  }
}

let currentComponentInstanceId = 0

const {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: oldReactInternals,
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE:
    newReactInternals,
} = React as any

const useCurrentComponent = () => {
  return (
    oldReactInternals?.ReactCurrentOwner?.current?.elementType ??
    newReactInternals?.A?.getOwner?.()?.elementType ??
    {}
  )
}

const useState = <Context extends IContext<{ state: {} }>>(
  cb?: (state: Context['state']) => any
): Context['state'] => {
  const overmind = React.useContext(context) as Overmind<any>

  if (!(overmind as any).mode) {
    throwMissingContextError()
  }

  if (isNode || (overmind as any).mode.mode === MODE_SSR) {
    return overmind.state
  }

  const { forceRerender } = useForceRerender()

  const trackStateTree = (
    overmind as any
  ).proxyStateTreeInstance.getTrackStateTree()
  const state = cb ? cb(trackStateTree.state) : trackStateTree.state

  trackStateTree.track()

  if (IS_PRODUCTION) {
    React.useEffect(
      () =>
        trackStateTree.subscribe((_, __, flushId) => {
          forceRerender(flushId)
        }),
      [trackStateTree]
    )
  } else {
    const component = useCurrentComponent()
    const name = getDisplayName(component)
    component.__componentId =
      typeof component.__componentId === 'undefined'
        ? nextComponentId++
        : component.__componentId

    const { current: componentInstanceId } = React.useRef<any>(
      currentComponentInstanceId++
    )

    React.useEffect(() => {
      overmind.eventHub.emitAsync(EventType.COMPONENT_ADD, {
        componentId: component.__componentId,
        componentInstanceId,
        name,
        paths: [],
      })

      return () => {
        overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
          componentId: component.__componentId,
          componentInstanceId,
          name,
        })
      }
    }, [])

    React.useEffect(() => {
      overmind.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
        componentId: component.__componentId,
        componentInstanceId,
        name,
        paths: Array.from(trackStateTree.pathDependencies) as any,
      })

      const dispose = trackStateTree.subscribe((_, __, flushId) => {
        forceRerender(flushId)
      })

      return () => {
        dispose()
      }
    }, [trackStateTree])
  }

  return state
}

const useActions = <
  Context extends IContext<{ actions: {} }>,
>(): Context['actions'] => {
  const overmind = React.useContext(context) as Overmind<any>

  if (!(overmind as any).mode) {
    throwMissingContextError()
  }

  return overmind.actions
}

const useEffects = <
  Context extends IContext<{ effects: {} }>,
>(): Context['effects'] => {
  const overmind = React.useContext(context) as Overmind<any>

  if (!(overmind as any).mode) {
    throwMissingContextError()
  }

  return overmind.effects
}

const useReaction = <
  Context extends IContext<{ state: {} }>,
>(): IReaction<Context> => {
  const overmind = React.useContext(context) as Overmind<any>

  if (!(overmind as any).mode) {
    throwMissingContextError()
  }

  return overmind.reaction as any
}

export interface StateHook<Context extends IContext<{}>> {
  (): Context['state']
  <T>(cb?: (state: Context['state']) => T): T
}

export const createStateHook: <
  Context extends IContext<{ state: {} }>,
>() => StateHook<Context> = () =>
  // eslint-disable-next-line dot-notation
  useState

export const createActionsHook: <
  Context extends IContext<{ actions: {} }>,
>() => () => Context['actions'] = () => {
  return useActions as any
}

export const createEffectsHook: <
  Context extends IContext<{ effects: {} }>,
>() => () => Context['effects'] = () => {
  return useEffects as any
}

export const createReactionHook: <
  Context extends IContext<{ state: {} }>,
>() => () => IReaction<Context> = () => {
  return useReaction as any
}
