import { ENVIRONMENT, EventType, IContext, MODE_SSR, Overmind } from 'overmind'
import { Component, ComponentOptions } from 'vue'

type AnyComponent = ComponentOptions | Component

const OVERMIND = Symbol('OVERMIND')
const IS_PRODUCTION = ENVIRONMENT === 'production'

let nextComponentId = 0

function createMixin(overmind, propsCallback, trackPropsCallback = false) {
  const componentId = nextComponentId++
  let componentInstanceId = 0

  return {
    beforeCreate(this: any) {
      if (overmind.mode.mode === MODE_SSR) {
        this.overmind = {
          state: overmind.state,
          actions: overmind.actions,
          effects: overmind.effects,
          addMutationListener: overmind.addMutationListener,
          reaction: overmind.reaction,
        }
        if (propsCallback) {
          Object.assign(
            this,
            propsCallback({
              state: overmind.state,
              actions: overmind.actions,
              effects: overmind.effects,
            })
          )
        }
      } else {
        this[OVERMIND] = {
          tree: (overmind as any).proxyStateTreeInstance.getTrackStateTree(),
          componentInstanceId: componentInstanceId++,
          onUpdate: (mutations, paths, flushId) => {
            this[OVERMIND].currentFlushId = flushId
            this[OVERMIND].isUpdating = true
            this.$forceUpdate()
          },
          isUpdating: false,
        }
        this.overmind = {
          state: this[OVERMIND].tree.state,
          actions: overmind.actions,
          effects: overmind.effects,
          addMutationListener: overmind.addMutationListener,
          reaction: overmind.reaction,
        }

        this[OVERMIND].tree.track(this[OVERMIND].onUpdate)

        if (propsCallback) {
          Object.assign(
            this,
            propsCallback({
              state: this[OVERMIND].tree.state,
              actions: overmind.actions,
              effects: overmind.effects,
            })
          )
        }
      }
    },
    beforeUpdate(this: any) {
      if (overmind.mode.mode === MODE_SSR) return

      this[OVERMIND].tree.track(this[OVERMIND].onUpdate)

      if (propsCallback && trackPropsCallback) {
        Object.assign(
          this,
          propsCallback({
            state: this[OVERMIND].tree.state,
            actions: overmind.actions,
            effects: overmind.effects,
          })
        )
      }
    },
    ...(IS_PRODUCTION
      ? {
          updated(this: any) {
            this[OVERMIND].tree.stopTracking()
          },
        }
      : {
          mounted(this: any) {
            if (overmind.mode.mode === MODE_SSR) return

            overmind.eventHub.emitAsync(EventType.COMPONENT_ADD, {
              componentId,
              componentInstanceId: this[OVERMIND].componentInstanceId,
              name: this.$options.name || '',
              paths: Array.from(this[OVERMIND].tree.pathDependencies) as any,
            })
          },
          updated(this: any) {
            if (overmind.mode.mode === MODE_SSR) return

            this[OVERMIND].tree.stopTracking()

            if (this[OVERMIND].isUpdating) {
              overmind.eventHub.emitAsync(EventType.COMPONENT_UPDATE, {
                componentId,
                componentInstanceId: this[OVERMIND].componentInstanceId,
                name: this.$options.name || '',
                flushId: this[OVERMIND].currentFlushId,
                paths: Array.from(this[OVERMIND].tree.pathDependencies) as any,
              })
              this[OVERMIND].isUpdating = false
            }
          },
        }),
    beforeDestroy(this: any) {
      if (overmind.mode.mode === MODE_SSR) return

      // @ts-ignore
      overmind.proxyStateTreeInstance.disposeTree(this[OVERMIND].tree)
      if (IS_PRODUCTION) {
        return
      }

      overmind.eventHub.emitAsync(EventType.COMPONENT_REMOVE, {
        componentId,
        componentInstanceId: this[OVERMIND].componentInstanceId,
        name: this.$options.name || '',
      })
    },
  }
}

export const createPlugin = (overmind) => ({
  install(
    Vue,
    propsCallback = ({ state, actions, effects }) => ({
      state,
      actions,
      effects,
    })
  ) {
    Vue.mixin(createMixin(overmind, propsCallback))
  },
})

export function createConnect<Context extends IContext<any>>(
  overmind: Overmind<any>
) {
  return <T>(
    cb: ((context: Context) => T) | AnyComponent,
    component?: AnyComponent
  ) => {
    const options: any = component || cb
    const propsCallback = component ? cb : null

    if (propsCallback && typeof propsCallback !== 'function') {
      throw new Error(
        `OVERMIND-VUE: When passing two arguments to "connect", the first has to be a function. You can alternatively only pass a single argument, which is the component`
      )
    }

    return {
      ...options,
      mixins: (options.mixins ? options.mixins : []).concat(
        createMixin(overmind, propsCallback, true)
      ),
      overmind,
    } as any
  }
}
