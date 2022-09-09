import {
  ENVIRONMENT,
  EventType,
  IReaction,
  IConfiguration,
  Overmind,
} from 'overmind'
import { afterUpdate, onDestroy, onMount } from 'svelte'
import { ITrackCallback } from 'proxy-state-tree'

const IS_PRODUCTION = ENVIRONMENT === 'production'

let nextComponentId = 0

export function createMixin<Config extends IConfiguration>(
  overmind: Overmind<Config>
) {
  const componentId = nextComponentId++
  let nextComponentInstanceId = 0
  let currentFlushId = 0

  const subscribe = (listener) => {
    // @ts-ignore
    const tree = overmind.proxyStateTreeInstance.getTrackStateTree()
    const componentInstanceId = nextComponentInstanceId++
    let isUpdating = false

    const onUpdate: ITrackCallback = (_mutations, _paths, flushId) => {
      tree.track(onUpdate)
      currentFlushId = flushId
      isUpdating = true
      listener(tree.state)
    }

    tree.track(onUpdate)

    listener(tree.state)

    if (IS_PRODUCTION) {
      afterUpdate(() => {
        tree.stopTracking()
        isUpdating = false
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

      afterUpdate(() => {
        tree.stopTracking()
        if (isUpdating) {
          overmind.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
            componentId,
            componentInstanceId,
            name: '',
            flushId: currentFlushId,
            paths: Array.from(tree.pathDependencies),
          })
        }
        isUpdating = false
      })
    }

    return () => {
      // @ts-ignore
      overmind.proxyStateTreeInstance.disposeTree(tree)
      overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
        componentId,
        componentInstanceId: componentInstanceId,
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
    reaction: reaction,
  }
}
