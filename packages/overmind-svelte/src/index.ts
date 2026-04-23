import {
  ENVIRONMENT,
  EventType,
  IReaction,
  IConfiguration,
  Overmind,
} from 'overmind'
import { onDestroy, onMount } from 'svelte'

const IS_PRODUCTION = ENVIRONMENT === 'production'

let nextComponentId = 0

export function createMixin<Config extends IConfiguration>(
  overmind: Overmind<Config>
) {
  const componentId = nextComponentId++
  let nextComponentInstanceId = 0

  const subscribe = (listener: (state: any) => void) => {
    const tree = (overmind as any).proxyStateTreeInstance.getTrackStateTree()
    const componentInstanceId = nextComponentInstanceId++

    tree.track()

    listener(tree.state)

    if (IS_PRODUCTION) {
      tree.subscribe((_mutations: any, _paths: any, flushId: any) => {
        listener(tree.state)
      })
    } else {
      onMount(() => {
        overmind.eventHub.emitAsync(EventType.COMPONENT_ADD, {
          componentId,
          componentInstanceId,
          name: '',
          paths: Array.from(tree.pathDependencies),
        })
      })

      tree.subscribe((_mutations: any, _paths: any, flushId: any) => {
        overmind.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
          componentId,
          componentInstanceId,
          name: '',
          flushId,
          paths: Array.from(tree.pathDependencies),
        })
        listener(tree.state)
      })
    }

    return () => {
      // @ts-ignore
      overmind.proxyStateTreeInstance.disposeTree(tree)
      overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
        componentId,
        componentInstanceId,
        name: '',
      })
    }
  }

  const reaction: IReaction<Config> = (...args) => {
    const dispose = overmind.reaction(...args)

    onDestroy(() => {
      dispose()
    })

    return dispose
  }

  return {
    state: { ...overmind.state, subscribe },
    actions: overmind.actions,
    effects: overmind.effects,
    addMutationListener: overmind.addMutationListener,
    reaction,
  }
}
