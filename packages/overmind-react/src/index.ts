import * as react from 'react'

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
  | react.FunctionComponent<P>
  | react.ComponentClass<P>
  | react.ClassicComponentClass<P>

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

const context = react.createContext<Overmind<any>>({} as Overmind<any>)
let nextComponentId = 0

export const Provider: react.ProviderExoticComponent<
  react.ProviderProps<Overmind<any> | OvermindMock<any>>
> = context.Provider

function useForceRerender() {
  const [flushId, forceRerender] = react.useState(-1)

  return {
    flushId,
    forceRerender,
  }
}

let currentComponentInstanceId = 0
const { ReactCurrentOwner } = (react as any)
  .__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
const useCurrentComponent = () => {
  return ReactCurrentOwner &&
    ReactCurrentOwner.current &&
    ReactCurrentOwner.current.elementType
    ? ReactCurrentOwner.current.elementType
    : {}
}

class ReactTrackerV18 {
  tree
  result
  cb
  updateCb
  constructor(tree: any) {
    this.tree = tree
    this.result = { state: tree.state }
    this.updateCb = () => {
      this.result = {
        state: this.tree.state,
      }

      if (this.cb) {
        this.cb()
      } else {
        this.tree.dispose()
      }
    }
  }

  subscribe = (cb) => {
    this.cb = cb

    return () => {
      if (IS_PRODUCTION) {
        this.tree.dispose()
      } else {
        // In development we do not dispose of the tree as React will do
        // "test runs" on effect hooks, it will rather be disposed when there is an
        // update to the tracked paths, but there is no longer a callback to trigger. This
        // can cause memory leaks in edge cases, but this is just development and does not matter
        delete this.cb
      }
    }
  }

  getState = () => {
    return this.result
  }

  track() {
    this.tree.track(this.updateCb)
  }

  stopTracking() {
    this.tree.stopTracking()
  }
}

const useStateV18 = <Context extends IContext<{ state: {} }>>(
  cb?: (state: Context['state']) => any
): Context['state'] => {
  const overmind = react.useContext(context) as Overmind<any>

  if (!(overmind as any).mode) {
    throwMissingContextError()
  }

  if (isNode || (overmind as any).mode.mode === MODE_SSR) {
    return overmind.state
  }

  const ref = react.useRef(null)

  if (!ref.current) {
    // @ts-ignore
    ref.current = new ReactTrackerV18(overmind.getTrackStateTree())
  }

  const tracker = ref.current as any

  // @ts-ignore
  const snapshot = react.useSyncExternalStore(
    tracker.subscribe,
    tracker.getState
  )
  const mountedRef = react.useRef<any>(false)
  const state = cb ? cb(snapshot.state) : snapshot.state

  tracker.track()

  if (IS_PRODUCTION) {
    react.useLayoutEffect(() => {
      tracker.stopTracking()
    }, [tracker])
  } else {
    const component = useCurrentComponent()
    const name = getDisplayName(component)
    component.__componentId =
      typeof component.__componentId === 'undefined'
        ? nextComponentId++
        : component.__componentId

    const { current: componentInstanceId } = react.useRef<any>(
      currentComponentInstanceId++
    )

    react.useLayoutEffect(() => {
      mountedRef.current = true
      overmind.eventHub.emitAsync(EventType.COMPONENT_ADD, {
        componentId: component.__componentId,
        componentInstanceId,
        name,
        paths: Array.from(tracker.tree.pathDependencies) as any,
      })

      return () => {
        mountedRef.current = false
        overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
          componentId: component.__componentId,
          componentInstanceId,
          name,
        })
      }
    }, [])

    react.useLayoutEffect(() => {
      tracker.stopTracking()

      overmind.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
        componentId: component.__componentId,
        componentInstanceId,
        name,
        flushId: 0,
        paths: Array.from(tracker.tree.pathDependencies) as any,
      })
    }, [tracker])
  }

  return state
}

const useState = <Context extends IContext<{ state: {} }>>(
  cb?: (state: Context['state']) => any
): Context['state'] => {
  const overmind = react.useContext(context) as Overmind<any>

  if (!(overmind as any).mode) {
    throwMissingContextError()
  }

  if (isNode || (overmind as any).mode.mode === MODE_SSR) {
    return overmind.state
  }

  const mountedRef = react.useRef<any>(false)
  const { flushId, forceRerender } = useForceRerender()
  const tree = react.useMemo(
    () => (overmind as any).proxyStateTreeInstance.getTrackStateTree(),
    [flushId]
  )

  const state = cb ? cb(tree.state) : tree.state

  if (IS_PRODUCTION) {
    react.useLayoutEffect(() => {
      mountedRef.current = true
      tree.stopTracking()

      return () => {
        tree.dispose()
      }
    }, [tree])

    tree.track((_, __, flushId) => {
      if (!mountedRef.current) {
        // This one is not dealt with by the useLayoutEffect
        tree.dispose()
        return
      }
      forceRerender(flushId)
    })
  } else {
    const component = useCurrentComponent()
    const name = getDisplayName(component)
    component.__componentId =
      typeof component.__componentId === 'undefined'
        ? nextComponentId++
        : component.__componentId

    const { current: componentInstanceId } = react.useRef<any>(
      currentComponentInstanceId++
    )

    react.useLayoutEffect(() => {
      mountedRef.current = true
      overmind.eventHub.emitAsync(EventType.COMPONENT_ADD, {
        componentId: component.__componentId,
        componentInstanceId,
        name,
        paths: Array.from(tree.pathDependencies) as any,
      })

      return () => {
        mountedRef.current = false
        overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
          componentId: component.__componentId,
          componentInstanceId,
          name,
        })
      }
    }, [])

    react.useLayoutEffect(() => {
      tree.stopTracking()

      overmind.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
        componentId: component.__componentId,
        componentInstanceId,
        name,
        flushId,
        paths: Array.from(tree.pathDependencies) as any,
      })

      return () => {
        tree.dispose()
      }
    }, [tree])
    tree.track((_, __, flushId) => {
      if (!mountedRef.current) {
        // This one is not dealt with by the useLayoutEffect
        tree.dispose()
        return
      }
      forceRerender(flushId)
    })
  }

  return state
}

const useActions = <
  Context extends IContext<{ actions: {} }>
>(): Context['actions'] => {
  const overmind = react.useContext(context) as Overmind<any>

  if (!(overmind as any).mode) {
    throwMissingContextError()
  }

  return overmind.actions
}

const useEffects = <
  Context extends IContext<{ effects: {} }>
>(): Context['effects'] => {
  const overmind = react.useContext(context) as Overmind<any>

  if (!(overmind as any).mode) {
    throwMissingContextError()
  }

  return overmind.effects
}

const useReaction = <
  Context extends IContext<{ state: {} }>
>(): IReaction<Context> => {
  const overmind = react.useContext(context) as Overmind<any>

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
  Context extends IContext<{ state: {} }>
>() => StateHook<Context> = () =>
  // eslint-disable-next-line dot-notation
  typeof react['useSyncExternalStore'] === 'function' ? useStateV18 : useState

export const createActionsHook: <
  Context extends IContext<{ actions: {} }>
>() => () => Context['actions'] = () => {
  return useActions as any
}

export const createEffectsHook: <
  Context extends IContext<{ effects: {} }>
>() => () => Context['effects'] = () => {
  return useEffects as any
}

export const createReactionHook: <
  Context extends IContext<{ state: {} }>
>() => () => IReaction<Context> = () => {
  return useReaction as any
}
