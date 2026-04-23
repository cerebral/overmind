import { Overmind, EventType } from 'overmind'

jest.mock('svelte', () => ({
  onDestroy: jest.fn(),
  onMount: jest.fn(),
}))

import { onDestroy, onMount } from 'svelte'
import { createMixin } from './'

const mockOnDestroy = onDestroy as jest.Mock
const mockOnMount = onMount as jest.Mock

const app = {
  state: {
    count: 0,
    nested: {
      value: 'test',
    },
  },
  actions: {
    increase({ state }: any) {
      state.count++
    },
    decrease({ state }: any) {
      state.count--
    },
  },
}

describe('overmind-svelte', () => {
  beforeEach(() => {
    mockOnDestroy.mockClear()
    mockOnMount.mockClear()
  })

  describe('createMixin', () => {
    test('should return state, actions, effects, addMutationListener, and reaction', () => {
      const overmind = new Overmind(app)
      const mixin = createMixin(overmind)

      expect(mixin).toHaveProperty('state')
      expect(mixin).toHaveProperty('actions')
      expect(mixin).toHaveProperty('effects')
      expect(mixin).toHaveProperty('addMutationListener')
      expect(mixin).toHaveProperty('reaction')
    })

    test('should expose state values and a subscribe function', () => {
      const overmind = new Overmind(app)
      const mixin = createMixin(overmind)

      expect(mixin.state.count).toBe(0)
      expect(mixin.state.nested.value).toBe('test')
      expect(typeof mixin.state.subscribe).toBe('function')
    })

    test('should expose actions', () => {
      const overmind = new Overmind(app)
      const mixin = createMixin(overmind)

      expect(typeof mixin.actions.increase).toBe('function')
      expect(typeof mixin.actions.decrease).toBe('function')
    })
  })

  describe('subscribe', () => {
    test('should call listener immediately with initial state', () => {
      const overmind = new Overmind(app)
      const mixin = createMixin(overmind)
      const listener = jest.fn()

      mixin.state.subscribe(listener)

      expect(listener).toHaveBeenCalledTimes(1)
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({ count: 0 })
      )
    })

    test('should call listener when tracked state changes', () => {
      const overmind = new Overmind(app)
      const mixin = createMixin(overmind)
      let capturedCount = -1
      const listener = jest.fn((state) => {
        capturedCount = state.count // access count to register tracking path
      })

      mixin.state.subscribe(listener)
      expect(capturedCount).toBe(0)
      listener.mockClear()

      mixin.actions.increase()

      expect(listener).toHaveBeenCalledTimes(1)
      expect(capturedCount).toBe(1)
    })

    test('should register onMount for COMPONENT_ADD event', () => {
      const overmind = new Overmind(app)
      const eventSpy = jest.spyOn(overmind.eventHub, 'emitAsync')
      const mixin = createMixin(overmind)
      const listener = jest.fn((state) => {
        state.count // access count to register tracking path
      })

      mixin.state.subscribe(listener)

      expect(mockOnMount).toHaveBeenCalledTimes(1)

      // Simulate Svelte calling the onMount callback
      const onMountCallback = mockOnMount.mock.calls[0][0]
      onMountCallback()

      expect(eventSpy).toHaveBeenCalledWith(
        EventType.COMPONENT_ADD,
        expect.objectContaining({
          componentId: expect.any(Number),
          componentInstanceId: expect.any(Number),
          name: '',
          paths: expect.any(Array),
        })
      )
    })

    test('should emit COMPONENT_UPDATE on state change', () => {
      const overmind = new Overmind(app)
      const eventSpy = jest.spyOn(overmind.eventHub, 'emitAsync')
      const mixin = createMixin(overmind)
      const listener = jest.fn((state) => {
        state.count // access count to register tracking path
      })

      mixin.state.subscribe(listener)
      eventSpy.mockClear()

      mixin.actions.increase()

      expect(eventSpy).toHaveBeenCalledWith(
        EventType.COMPONENT_UPDATE,
        expect.objectContaining({
          componentId: expect.any(Number),
          componentInstanceId: expect.any(Number),
          name: '',
          flushId: expect.any(Number),
          paths: expect.any(Array),
        })
      )
    })

    test('should not emit COMPONENT_UPDATE when no state change occurs', () => {
      const overmind = new Overmind(app)
      const eventSpy = jest.spyOn(overmind.eventHub, 'emitAsync')
      const mixin = createMixin(overmind)
      const listener = jest.fn((state) => {
        state.count // access count to register tracking path
      })

      mixin.state.subscribe(listener)
      eventSpy.mockClear()

      // No action dispatched — no COMPONENT_UPDATE expected
      const updateCalls = eventSpy.mock.calls.filter(
        (call) => call[0] === EventType.COMPONENT_UPDATE
      )
      expect(updateCalls).toHaveLength(0)
    })

    test('should return an unsubscribe function that disposes the tree and emits COMPONENT_REMOVE', () => {
      const overmind = new Overmind(app)
      const eventSpy = jest.spyOn(overmind.eventHub, 'emitAsync')
      const disposeSpy = jest.spyOn(
        (overmind as any).proxyStateTreeInstance,
        'disposeTree'
      )
      const mixin = createMixin(overmind)
      const listener = jest.fn()

      const unsubscribe = mixin.state.subscribe(listener)
      eventSpy.mockClear()

      unsubscribe()

      expect(disposeSpy).toHaveBeenCalled()
      expect(eventSpy).toHaveBeenCalledWith(
        EventType.COMPONENT_REMOVE,
        expect.objectContaining({
          componentId: expect.any(Number),
          componentInstanceId: expect.any(Number),
          name: '',
        })
      )
    })

    test('should support multiple independent subscribers', () => {
      const overmind = new Overmind(app)
      const mixin = createMixin(overmind)
      let count1 = -1
      let count2 = -1
      const listener1 = jest.fn((state) => {
        count1 = state.count
      })
      const listener2 = jest.fn((state) => {
        count2 = state.count
      })

      const unsub1 = mixin.state.subscribe(listener1)
      const unsub2 = mixin.state.subscribe(listener2)
      listener1.mockClear()
      listener2.mockClear()

      mixin.actions.increase()

      expect(count1).toBe(1)
      expect(count2).toBe(1)

      unsub1()
      unsub2()
    })
  })

  describe('reaction', () => {
    test('should create a reaction and register onDestroy for cleanup', () => {
      const overmind = new Overmind(app)
      const reactionSpy = jest.spyOn(overmind, 'reaction')
      const mixin = createMixin(overmind)

      const trackFn = (state: any) => state.count
      const updateFn = jest.fn()

      const dispose = mixin.reaction(trackFn, updateFn)

      expect(reactionSpy).toHaveBeenCalledWith(trackFn, updateFn)
      expect(typeof dispose).toBe('function')
      expect(mockOnDestroy).toHaveBeenCalledTimes(1)
    })

    test('should dispose reaction when onDestroy fires', () => {
      const overmind = new Overmind(app)
      const disposeSpy = jest.fn()
      jest.spyOn(overmind, 'reaction').mockReturnValue(disposeSpy)
      const mixin = createMixin(overmind)

      mixin.reaction((state: any) => state.count, jest.fn())

      const onDestroyCallback = mockOnDestroy.mock.calls[0][0]
      onDestroyCallback()

      expect(disposeSpy).toHaveBeenCalledTimes(1)
    })

    test('should trigger update function when tracked state changes', () => {
      const overmind = new Overmind(app)
      const mixin = createMixin(overmind)
      const updateFn = jest.fn()

      mixin.reaction((state: any) => state.count, updateFn)
      mixin.actions.increase()

      expect(updateFn).toHaveBeenCalledWith(1)
    })

    test('should forward options to overmind.reaction', () => {
      const overmind = new Overmind(app)
      const reactionSpy = jest.spyOn(overmind, 'reaction')
      const mixin = createMixin(overmind)

      const trackFn = (state: any) => state.nested
      const updateFn = jest.fn()
      const options = { nested: true }

      mixin.reaction(trackFn, updateFn, options)

      expect(reactionSpy).toHaveBeenCalledWith(trackFn, updateFn, options)
    })
  })
})
