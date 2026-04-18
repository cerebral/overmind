jest.mock('overmind', () => {
  const actual = jest.requireActual('overmind')
  return {
    ...actual,
    ENVIRONMENT: 'production',
  }
})

jest.mock('svelte', () => ({
  onDestroy: jest.fn(),
  onMount: jest.fn(),
}))

import { Overmind, EventType } from 'overmind'
import { onMount } from 'svelte'
import { createMixin } from './'

const mockOnMount = onMount as jest.Mock

const app = {
  state: {
    count: 0,
  },
  actions: {
    increase({ state }: any) {
      state.count++
    },
  },
}

describe('overmind-svelte (production mode)', () => {
  beforeEach(() => {
    mockOnMount.mockClear()
  })

  test('should not register onMount in production', () => {
    const overmind = new Overmind(app)
    const mixin = createMixin(overmind)
    const listener = jest.fn((state) => {
      state.count // access count to register tracking path
    })

    mixin.state.subscribe(listener)

    expect(mockOnMount).not.toHaveBeenCalled()
  })

  test('should call listener on state changes', () => {
    const overmind = new Overmind(app)
    const mixin = createMixin(overmind)
    let capturedCount = -1
    const listener = jest.fn((state) => {
      capturedCount = state.count
    })

    mixin.state.subscribe(listener)
    expect(capturedCount).toBe(0)
    listener.mockClear()

    mixin.actions.increase()

    expect(listener).toHaveBeenCalledTimes(1)
    expect(capturedCount).toBe(1)
  })

  test('should not emit devtools events on state change', () => {
    const overmind = new Overmind(app)
    const eventSpy = jest.spyOn(overmind.eventHub, 'emitAsync')
    const mixin = createMixin(overmind)
    const listener = jest.fn((state) => {
      state.count // access count to register tracking path
    })

    mixin.state.subscribe(listener)
    eventSpy.mockClear()

    mixin.actions.increase()

    const devtoolsCalls = eventSpy.mock.calls.filter(
      call => call[0] === EventType.COMPONENT_ADD ||
              call[0] === EventType.COMPONENT_UPDATE
    )
    expect(devtoolsCalls).toHaveLength(0)
  })
})
