jest.mock('overmind', () => {
  const actual = jest.requireActual('overmind')
  return {
    ...actual,
    ENVIRONMENT: 'production',
  }
})

import { Overmind } from 'overmind'
import { defineComponent, h, nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'

import { withOvermind, createStateHook } from './'

const config = {
  state: {
    foo: 'bar',
  },
  actions: {
    doThis: ({ state }: any) => {
      state.foo = 'bar2'
    },
  },
}

function mountWithOvermind(app: any, setup: () => () => any) {
  const Comp = defineComponent({ setup })
  return mount(withOvermind(app, Comp))
}

describe('Vue (production mode)', () => {
  test('should render and re-render state', async () => {
    const app = new Overmind(config)
    let renderCount = 0

    const wrapper = mountWithOvermind(app, () => {
      const state = createStateHook()()
      return () => {
        renderCount++
        return h('div', {}, (state.value as any).foo)
      }
    })

    expect(renderCount).toBe(1)
    expect(wrapper.text()).toBe('bar')

    app.actions.doThis()
    await flushPromises()
    await nextTick()

    expect(renderCount).toBe(2)
    expect(wrapper.text()).toBe('bar2')
  })

  test('should re-render scoped state', async () => {
    const app = new Overmind(config)

    const wrapper = mountWithOvermind(app, () => {
      const state = createStateHook()((s: any) => ({ myFoo: s.foo }))
      return () => h('div', {}, (state.value as any).myFoo)
    })

    expect(wrapper.text()).toBe('bar')

    app.actions.doThis()
    await flushPromises()
    await nextTick()

    expect(wrapper.text()).toBe('bar2')
  })

  test('should dispose tree on unmount without devtools events', () => {
    const app = new Overmind(config)
    const disposeSpy = jest.spyOn(
      (app as any).proxyStateTreeInstance,
      'disposeTree'
    )
    const emitSpy = jest.spyOn(app.eventHub, 'emitAsync')

    const wrapper = mountWithOvermind(app, () => {
      const state = createStateHook()()
      return () => h('div', {}, (state.value as any).foo)
    })

    emitSpy.mockClear()
    wrapper.unmount()

    expect(disposeSpy).toHaveBeenCalledTimes(1)
    expect(emitSpy).not.toHaveBeenCalled()
  })
})
