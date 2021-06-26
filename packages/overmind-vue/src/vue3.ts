import {
  ENVIRONMENT,
  EventType,
  IConfiguration,
  MODE_SSR,
  Overmind,
  IContext,
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

export interface StateHook<Context extends IContext<{ state: {} }>> {
  (): Ref<Context['state']>
  <CB extends (state: Context['state']) => object>(cb: CB): CB extends (
    state: Context['state']
  ) => infer O
    ? O extends object
      ? Ref<O>
      : never
    : never
}

export function createStateHook<
  Context extends IContext<{ state: {} }>
>(): StateHook<Context> {
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
        value.tree = overmindInstance.proxyStateTreeInstance.getTrackStateTree()
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

        overmindInstance.proxyStateTreeInstance.disposeTree(value.tree)
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

export interface ActionsHook<Context extends IContext<{ actions: {} }>> {
  (): Ref<Context['actions']>
  <CB extends (actions: Context['actions']) => object>(cb: CB): CB extends (
    actions: Context['actions']
  ) => infer O
    ? O extends object
      ? Ref<O>
      : never
    : never
}

export function createActionsHook<
  Context extends IContext<{ actions: {} }>
>(): ActionsHook<Context> {
  return ((cb?: any): Context['actions'] => {
    const overmindInstance = inject<any>('overmind')

    return cb ? cb(overmindInstance.actions) : overmindInstance.actions
  }) as any
}

export interface EffectsHook<Context extends IContext<{ effects: {} }>> {
  (): Ref<Context['effects']>
  <CB extends (effects: Context['effects']) => object>(cb: CB): CB extends (
    effects: Context['effects']
  ) => infer O
    ? O extends object
      ? Ref<O>
      : never
    : never
}

export function createEffectsHook<
  Context extends IContext<{ effects: {} }>
>(): EffectsHook<Context> {
  return ((cb?: any): Context['effects'] => {
    const overmindInstance = inject<any>('overmind')

    return cb ? cb(overmindInstance.effects) : overmindInstance.effects
  }) as any
}

export function createReactionHook<Context extends IContext<{ state: {} }>>() {
  return (): Context['reaction'] => {
    const overmindInstance = inject<any>('overmind')

    return overmindInstance.reaction
  }
}

export function createHooks<
  Context extends IContext<{ state: {}; actions: {}; effects: {} }>
>() {
  return {
    state: createStateHook<Context>(),
    actions: createActionsHook<Context>(),
    effects: createEffectsHook<Context>(),
    reaction: createReactionHook<Context>(),
  }
}
