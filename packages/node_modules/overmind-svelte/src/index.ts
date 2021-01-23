import { ENVIRONMENT, EventType } from 'overmind'
import { afterUpdate, onDestroy, onMount } from 'svelte'

const IS_PRODUCTION = ENVIRONMENT === 'production'

let nextComponentId = 0

export function createMixin(overmind) {
  const componentId = nextComponentId++
  let nextComponentInstanceId = 0
  let currentFlushId = 0

  const subscribe = (listener) => {
    const tree = overmind.proxyStateTreeInstance.getTrackStateTree()
    const componentInstanceId = nextComponentInstanceId++
    let isUpdating = false

    const onUpdate = (mutations, paths, flushId) => {
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
      overmind.proxyStateTreeInstance.disposeTree(tree)
      overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
        componentId,
        componentInstanceId: componentInstanceId,
        name: '',
      })
    }
  }

  const reaction = (...args) => {
    const dispose = overmind.reaction(...args)

    onDestroy(() => {
      dispose()
    })
  }

  return {
    state: { ...overmind.state, subscribe },
    actions: overmind.actions,
    effects: overmind.effects,
    addMutationListener: overmind.addMutationListener,
    reaction: reaction,
  }
}
