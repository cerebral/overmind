import {
  ENVIRONMENT,
  EventType,
  IConfiguration,
  MODE_SSR,
  Overmind,
} from 'overmind'
import {
  Ref,
  inject,
  ref,
  onBeforeUpdate,
  onRenderTracked,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  provide,
  h,
  Component,
} from 'vue'

const IS_PRODUCTION = ENVIRONMENT === 'production'

let nextComponentId = 0

export const withOvermind = (
  instance: Overmind<IConfiguration>,
  Component: Component
) => {
  return defineComponent({
    setup() {
      provide('overmind', instance)
    },
    render() {
      return h(Component)
    },
  })
}

export interface StateHook<Config extends IConfiguration> {
  (): Ref<Overmind<Config>['state']>
  <CB extends (state: Overmind<Config>['state']) => object>(
    cb: CB
  ): CB extends (state: Overmind<Config>['state']) => infer O
    ? O extends object
      ? Ref<O>
      : never
    : never
}

export function createStateHook<Config extends IConfiguration>(): StateHook<
  Config
> {
  const componentId = nextComponentId++
  let componentInstanceId = 0
  return ((cb: any) => {
    const overmindInstance = inject<any>('overmind')

    if (overmindInstance.mode.mode === MODE_SSR) {
      return cb ? cb(overmindInstance.state) : overmindInstance.state
    } else {
      const overmindRef = ref<any>({})
      const flushIds = ref(-1)
      const { value } = overmindRef
      const state = ref(
        cb ? cb(overmindInstance.state) : overmindInstance.state
      )

      if (!value.tree) {
        value.tree = overmindInstance.proxyStateTree.getTrackStateTree()
        value.componentInstanceId = componentInstanceId++
        value.onUpdate = (_: any, __: any, flushId: number) => {
          value.currentFlushId = flushId
          value.isUpdating = true
          flushIds.value = flushId
          state.value = {
            ...(cb ? cb(overmindInstance.state) : overmindInstance.state),
          }

          // this.$forceUpdate()
        }
        value.isUpdating = false
      }

      onBeforeUpdate(function(this: any) {
        if (overmindInstance.mode.mode === MODE_SSR) return

        value.tree.track(value.onUpdate)
      })

      onRenderTracked(function(this: any) {
        if (IS_PRODUCTION) {
          return
        }

        if (overmindInstance.isUpdating) {
          overmindInstance.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
            componentId,
            componentInstanceId: value.componentInstanceId,
            name: '', // this.$options.name || '',
            flushId: value.currentFlushId,
            paths: Array.from(value.tree.pathDependencies) as any,
          })
          value.isUpdating = false
        }
      })

      onMounted(() => {
        if (IS_PRODUCTION || overmindInstance.mode.mode === MODE_SSR) return
        value.tree.stopTracking()
        overmindInstance.eventHub.emitAsync(EventType.COMPONENT_ADD, {
          componentId,
          componentInstanceId: value.componentInstanceId,
          name: '', // this.$options.name || '',
          paths: Array.from(value.tree.pathDependencies) as any,
        })
      })

      onBeforeUnmount(() => {
        if (overmindInstance.mode.mode === MODE_SSR) return

        overmindInstance.proxyStateTree.disposeTree(value.tree)
        if (IS_PRODUCTION) {
          return
        }

        overmindInstance.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
          componentId,
          componentInstanceId: value.componentInstanceId,
          name: '', // this.$options.name || '',
        })
      })

      value.tree.track(value.onUpdate)

      return state
    }
  }) as any
}

export interface ActionsHook<Config extends IConfiguration> {
  (): Ref<Overmind<Config>['actions']>
  <CB extends (actions: Overmind<Config>['actions']) => object>(
    cb: CB
  ): CB extends (actions: Overmind<Config>['actions']) => infer O
    ? O extends object
      ? Ref<O>
      : never
    : never
}

export function createActionsHook<Config extends IConfiguration>(): ActionsHook<
  Config
> {
  return ((cb?: any): Overmind<Config>['actions'] => {
    const overmindInstance = inject<any>('overmind')

    return cb ? cb(overmindInstance.actions) : overmindInstance.actions
  }) as any
}

export interface EffectsHook<Config extends IConfiguration> {
  (): Ref<Overmind<Config>['effects']>
  <CB extends (effects: Overmind<Config>['effects']) => object>(
    cb: CB
  ): CB extends (effects: Overmind<Config>['effects']) => infer O
    ? O extends object
      ? Ref<O>
      : never
    : never
}

export function createEffectsHook<Config extends IConfiguration>(): EffectsHook<
  Config
> {
  return ((cb?: any): Overmind<Config>['effects'] => {
    const overmindInstance = inject<any>('overmind')

    return cb ? cb(overmindInstance.effects) : overmindInstance.effects
  }) as any
}

export function createReactionHook<Config extends IConfiguration>() {
  return (): Overmind<Config>['reaction'] => {
    const overmindInstance = inject<any>('overmind')

    return overmindInstance.reaction
  }
}

export function createHooks<Config extends IConfiguration>() {
  return {
    state: createStateHook<Config>(),
    actions: createActionsHook<Config>(),
    effects: createEffectsHook<Config>(),
    reaction: createReactionHook<Config>(),
  }
}
