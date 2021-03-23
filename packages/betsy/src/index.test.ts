import { EventEmitter } from './'

interface Events {
  test: {
    test: boolean
  }
}

let emitter: EventEmitter<Events>

beforeEach(() => {
  emitter = new EventEmitter()
})

describe('Betsy', () => {
  test('should emit to no listeners', () => {
    expect.assertions(0)

    emitter.emit('test', { test: true })
  })

  test('should receive event from subscription', () => {
    expect.assertions(1)

    emitter.on('test', (data) => {
      expect(data).toEqual({
        test: true,
      })
    })

    emitter.emit('test', { test: true })
  })

  test('should receive events  from subscription', () => {
    expect.assertions(3)

    emitter.on('test', (data) => {
      expect(data).toEqual({
        test: true,
      })
    })

    emitter.emit('test', { test: true })
    emitter.emit('test', { test: true })
    emitter.emit('test', { test: true })
  })

  test('should receve only one event from once', () => {
    expect.assertions(4)

    emitter.once('test', (data) => {
      expect(data).toEqual({
        test: true,
      })
    })

    emitter.on('test', (data) => {
      expect(data).toEqual({
        test: true,
      })
    })

    emitter.emit('test', { test: true })
    emitter.emit('test', { test: true })
    emitter.emit('test', { test: true })
  })

  test('should receve only one event when not the first subscription', () => {
    expect.assertions(7)

    emitter.on('test', (data) => {
      expect(data).toEqual({
        test: true,
      })
    })

    emitter.once('test', (data) => {
      expect(data).toEqual({
        test: true,
      })
    })

    emitter.on('test', (data) => {
      expect(data).toEqual({
        test: true,
      })
    })

    emitter.emit('test', { test: true })
    emitter.emit('test', { test: true })
    emitter.emit('test', { test: true })
  })
})
