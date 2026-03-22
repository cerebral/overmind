import { Overmind, createOvermindSSR, EventType } from 'overmind'
import { defineComponent, h, nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'

import {
  withOvermind,
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
  createHooks,
} from './'

const config = {
  state: {
    foo: 'bar',
  },
  actions: {
    doThis: ({ state }: any) => {
      state.foo = 'bar2'
    },
  },
  effects: {
    api: {
      fetch: () => Promise.resolve('data'),
    },
  },
}

function mountWithOvermind(app: any, setup: () => () => any) {
  const Comp = defineComponent({ setup })
  return mount(withOvermind(app, Comp))
}

describe('Vue', () => {
  describe('createStateHook', () => {
    test('should return state', () => {
      const app = new Overmind(config)
      const useState = createStateHook()

      const wrapper = mountWithOvermind(app, () => {
        const state = useState()
        return () => h('div', {}, (state.value as any).foo)
      })

      expect(wrapper.text()).toBe('bar')
    })

    test('should return scoped state with callback', () => {
      const app = new Overmind(config)
      const useState = createStateHook()

      const wrapper = mountWithOvermind(app, () => {
        const state = useState((s: any) => ({ myFoo: s.foo }))
        return () => h('div', {}, (state.value as any).myFoo)
      })

      expect(wrapper.text()).toBe('bar')
    })

    test('should re-render when state changes', async () => {
      const app = new Overmind(config)
      const useState = createStateHook()
      let renderCount = 0

      const wrapper = mountWithOvermind(app, () => {
        const state = useState()
        return () => {
          renderCount++
          return h('div', {}, (state.value as any).foo)
        }
      })

      expect(renderCount).toBe(1)

      app.actions.doThis()
      await nextTick()

      expect(renderCount).toBe(2)
      expect(wrapper.text()).toBe('bar2')
    })

    test('should re-render scoped state when state changes', async () => {
      const app = new Overmind(config)
      const useState = createStateHook()

      const wrapper = mountWithOvermind(app, () => {
        const state = useState((s: any) => ({ myFoo: s.foo }))
        return () => h('div', {}, (state.value as any).myFoo)
      })

      app.actions.doThis()
      await flushPromises()
      await nextTick()

      expect(wrapper.text()).toBe('bar2')
    })

    test('should return SSR state', () => {
      const app = createOvermindSSR(config)
      const useState = createStateHook()

      const wrapper = mountWithOvermind(app, () => {
        const state = useState()
        return () => h('div', {}, (state as any).foo)
      })

      expect(wrapper.text()).toBe('bar')
    })

    test('should return scoped SSR state with callback', () => {
      const app = createOvermindSSR(config)
      const useState = createStateHook()

      const wrapper = mountWithOvermind(app, () => {
        const state = useState((s: any) => ({ myFoo: s.foo }))
        return () => h('div', {}, (state as any).myFoo)
      })

      expect(wrapper.text()).toBe('bar')
    })
  })

  describe('createActionsHook', () => {
    test('should return actions', () => {
      const app = new Overmind(config)
      let captured: any

      mountWithOvermind(app, () => {
        captured = createActionsHook()()
        return () => h('div')
      })

      expect(captured).toBe(app.actions)
    })

    test('should return scoped actions with callback', () => {
      const app = new Overmind(config)
      let captured: any

      mountWithOvermind(app, () => {
        captured = createActionsHook()((a: any) => ({ myAction: a.doThis }))
        return () => h('div')
      })

      expect(captured.myAction).toBe(app.actions.doThis)
    })
  })

  describe('createEffectsHook', () => {
    test('should return effects', () => {
      const app = new Overmind(config)
      let captured: any

      mountWithOvermind(app, () => {
        captured = createEffectsHook()()
        return () => h('div')
      })

      expect(captured).toBe(app.effects)
    })

    test('should return scoped effects with callback', () => {
      const app = new Overmind(config)
      let captured: any

      mountWithOvermind(app, () => {
        captured = createEffectsHook()((e: any) => ({ myApi: e.api }))
        return () => h('div')
      })

      expect(captured.myApi).toBe(app.effects.api)
    })
  })

  describe('createReactionHook', () => {
    test('should return reaction', () => {
      const app = new Overmind(config)
      let captured: any

      mountWithOvermind(app, () => {
        captured = createReactionHook()()
        return () => h('div')
      })

      expect(captured).toBe(app.reaction)
    })
  })

  describe('createHooks', () => {
    test('should return working hooks', () => {
      const app = new Overmind(config)
      const hooks = createHooks()

      const wrapper = mountWithOvermind(app, () => {
        const state = hooks.state()
        const actions = hooks.actions()
        const effects = hooks.effects()
        const reaction = hooks.reaction()

        return () =>
          h('div', {}, [
            h('span', { id: 'state' }, (state.value as any).foo),
            h('span', { id: 'hasActions' }, String(!!actions)),
            h('span', { id: 'hasEffects' }, String(!!effects)),
            h('span', { id: 'hasReaction' }, String(!!reaction)),
          ])
      })

      expect(wrapper.find('#state').text()).toBe('bar')
      expect(wrapper.find('#hasActions').text()).toBe('true')
      expect(wrapper.find('#hasEffects').text()).toBe('true')
      expect(wrapper.find('#hasReaction').text()).toBe('true')
    })
  })

  describe('devtools events', () => {
    test('should emit COMPONENT_ADD on mount', async () => {
      const app = new Overmind(config)
      const emitSpy = jest.spyOn(app.eventHub, 'emitAsync')

      mountWithOvermind(app, () => {
        const state = createStateHook()()
        return () => h('div', {}, (state.value as any).foo)
      })
      await flushPromises()

      const addCalls = emitSpy.mock.calls.filter(
        (call) => call[0] === EventType.COMPONENT_ADD
      )
      expect(addCalls.length).toBe(1)
      expect(addCalls[0][1]).toHaveProperty('componentId')
      expect(addCalls[0][1]).toHaveProperty('componentInstanceId')
      expect(addCalls[0][1]).toHaveProperty('name', '')
      expect(addCalls[0][1]).toHaveProperty('paths')
    })

    test('should emit COMPONENT_UPDATE on state change', async () => {
      const app = new Overmind(config)
      const emitSpy = jest.spyOn(app.eventHub, 'emitAsync')

      mountWithOvermind(app, () => {
        const state = createStateHook()()
        return () => h('div', {}, (state.value as any).foo)
      })
      await flushPromises()
      emitSpy.mockClear()

      app.actions.doThis()
      await nextTick()

      const updateCalls = emitSpy.mock.calls.filter(
        (call) => call[0] === EventType.COMPONENT_UPDATE
      )
      expect(updateCalls.length).toBe(1)
      expect(updateCalls[0][1]).toHaveProperty('flushId')
      expect(updateCalls[0][1]).toHaveProperty('paths')
    })

    test('should emit COMPONENT_REMOVE on unmount', async () => {
      const app = new Overmind(config)
      const emitSpy = jest.spyOn(app.eventHub, 'emitAsync')

      const wrapper = mountWithOvermind(app, () => {
        const state = createStateHook()()
        return () => h('div', {}, (state.value as any).foo)
      })
      await flushPromises()
      emitSpy.mockClear()

      wrapper.unmount()

      const removeCalls = emitSpy.mock.calls.filter(
        (call) => call[0] === EventType.COMPONENT_REMOVE
      )
      expect(removeCalls.length).toBe(1)
      expect(removeCalls[0][1]).toHaveProperty('componentId')
      expect(removeCalls[0][1]).toHaveProperty('componentInstanceId')
      expect(removeCalls[0][1]).toHaveProperty('name', '')
    })

    test('should dispose tree on unmount', async () => {
      const app = new Overmind(config)
      const disposeSpy = jest.spyOn(
        (app as any).proxyStateTreeInstance,
        'disposeTree'
      )

      const wrapper = mountWithOvermind(app, () => {
        const state = createStateHook()()
        return () => h('div', {}, (state.value as any).foo)
      })
      await flushPromises()

      wrapper.unmount()

      expect(disposeSpy).toHaveBeenCalledTimes(1)
    })
  })
})
