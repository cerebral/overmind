import { absintheSocket } from './absinthe-socket'

describe('absintheSocket', () => {
  let mockSocket: any
  let mockChannel: any

  beforeEach(() => {
    // Mock Phoenix Channel
    mockChannel = {
      join: jest.fn().mockReturnThis(),
      on: jest.fn().mockReturnValue(123), // Return a mock ref number
      off: jest.fn(),
      push: jest.fn().mockReturnThis(),
      receive: jest.fn().mockReturnThis(),
    }

    // Mock Phoenix Socket
    mockSocket = {
      connect: jest.fn(),
      disconnect: jest.fn(),
      channel: jest.fn().mockReturnValue(mockChannel),
    }
  })

  afterEach(() => {
    // Clean up any subscriptions
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create an Absinthe socket and connect', () => {
      const socket = absintheSocket.create(mockSocket)

      expect(mockSocket.connect).toHaveBeenCalled()
      expect(mockSocket.channel).toHaveBeenCalledWith('__absinthe__:control')
      expect(mockChannel.join).toHaveBeenCalled()
      expect(socket.phoenixSocket).toBe(mockSocket)
      expect(socket.channel).toBe(mockChannel)
      expect(socket.subscriptions).toBeInstanceOf(Map)
    })

    it('should handle join success', () => {
      let onOkCallback: () => void = () => {}

      mockChannel.receive = jest.fn().mockImplementation((event, callback) => {
        if (event === 'ok') {
          onOkCallback = callback
        }
        return mockChannel
      })

      absintheSocket.create(mockSocket)

      // Should not throw when calling ok callback
      expect(() => onOkCallback()).not.toThrow()
    })

    it('should handle join error', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      let onErrorCallback: (reason: any) => void = () => {}

      mockChannel.receive = jest.fn().mockImplementation((event, callback) => {
        if (event === 'error') {
          onErrorCallback = callback
        }
        return mockChannel
      })

      absintheSocket.create(mockSocket)

      onErrorCallback('test error')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to join Absinthe control channel:',
        'test error'
      )

      consoleErrorSpy.mockRestore()
    })
  })

  describe('send', () => {
    it('should send a GraphQL subscription request', () => {
      const socket = absintheSocket.create(mockSocket)
      const operation = 'subscription { test }'
      const variables = { foo: 'bar' }

      const notifier = absintheSocket.send(socket, { operation, variables })

      expect(mockChannel.push).toHaveBeenCalledWith('doc', {
        query: operation,
        variables,
      })
      expect(notifier.subscriptionId).toMatch(/^subscription:\d+:/)
      expect(notifier.absintheSocket).toBe(socket)
    })

    it('should send without variables if not provided', () => {
      const socket = absintheSocket.create(mockSocket)
      const operation = 'subscription { test }'

      absintheSocket.send(socket, { operation })

      expect(mockChannel.push).toHaveBeenCalledWith('doc', {
        query: operation,
        variables: {},
      })
    })

    it('should handle successful subscription response', () => {
      const socket = absintheSocket.create(mockSocket)
      let onOkCallback: (response: any) => void = () => {}

      mockChannel.push = jest.fn().mockReturnThis()
      mockChannel.receive = jest.fn().mockImplementation((event, callback) => {
        if (event === 'ok') {
          onOkCallback = callback
        }
        return mockChannel
      })

      const notifier = absintheSocket.send(socket, {
        operation: 'subscription { test }',
      })

      onOkCallback({ subscriptionId: 'server-sub-123' })

      expect(socket.subscriptions.get('server-sub-123')).toBe(
        notifier.subscriptionId
      )
    })

    it('should handle subscription error', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const socket = absintheSocket.create(mockSocket)
      let onErrorCallback: (error: any) => void = () => {}

      mockChannel.push = jest.fn().mockReturnThis()
      mockChannel.receive = jest.fn().mockImplementation((event, callback) => {
        if (event === 'error') {
          onErrorCallback = callback
        }
        return mockChannel
      })

      absintheSocket.send(socket, { operation: 'subscription { test }' })

      onErrorCallback('subscription failed')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Subscription error:',
        'subscription failed'
      )

      consoleErrorSpy.mockRestore()
    })
  })

  describe('observe', () => {
    it('should register a subscription data handler', () => {
      const socket = absintheSocket.create(mockSocket)
      const notifier = absintheSocket.send(socket, {
        operation: 'subscription { test }',
      })
      const onResult = jest.fn()

      const observer = absintheSocket.observe(socket, notifier, { onResult })

      expect(mockChannel.on).toHaveBeenCalledWith(
        'subscription:data',
        expect.any(Function)
      )
      expect(observer.subscriptionId).toBe(notifier.subscriptionId)
      expect(observer.ref).toBe(123) // The mock ref we returned
    })

    it('should call onResult when matching subscription data arrives', () => {
      const socket = absintheSocket.create(mockSocket)
      const notifier = absintheSocket.send(socket, {
        operation: 'subscription { test }',
      })

      // Map the server subscription ID to our notifier
      socket.subscriptions.set('server-sub-123', notifier.subscriptionId)

      let dataHandler: (payload: any) => void = () => {}
      mockChannel.on = jest.fn().mockImplementation((event, callback) => {
        dataHandler = callback
        return 123
      })

      const onResult = jest.fn()
      absintheSocket.observe(socket, notifier, { onResult })

      // Simulate incoming subscription data
      dataHandler({
        subscriptionId: 'server-sub-123',
        result: { data: { test: 'value' } },
      })

      expect(onResult).toHaveBeenCalledWith({
        data: { data: { test: 'value' } },
      })
    })

    it('should not call onResult for non-matching subscription data', () => {
      const socket = absintheSocket.create(mockSocket)
      const notifier = absintheSocket.send(socket, {
        operation: 'subscription { test }',
      })

      let dataHandler: (payload: any) => void = () => {}
      mockChannel.on = jest.fn().mockImplementation((event, callback) => {
        dataHandler = callback
        return 123
      })

      const onResult = jest.fn()
      absintheSocket.observe(socket, notifier, { onResult })

      // Simulate incoming subscription data with different ID
      dataHandler({
        subscriptionId: 'different-sub-id',
        result: { data: { test: 'value' } },
      })

      expect(onResult).not.toHaveBeenCalled()
    })
  })

  describe('unobserve', () => {
    it('should unsubscribe and clean up', () => {
      const socket = absintheSocket.create(mockSocket)
      const notifier = absintheSocket.send(socket, {
        operation: 'subscription { test }',
      })
      const observer = absintheSocket.observe(socket, notifier, {
        onResult: jest.fn(),
      })

      // Add to subscriptions map
      socket.subscriptions.set('server-sub-123', notifier.subscriptionId)

      absintheSocket.unobserve(socket, notifier, observer)

      expect(mockChannel.off).toHaveBeenCalledWith('subscription:data', 123)
      expect(mockChannel.push).toHaveBeenCalledWith('unsubscribe', {
        subscriptionId: notifier.subscriptionId,
      })
      expect(socket.subscriptions.has('server-sub-123')).toBe(false)
    })

    it('should handle unsubscribe when subscription not in map', () => {
      const socket = absintheSocket.create(mockSocket)
      const notifier = absintheSocket.send(socket, {
        operation: 'subscription { test }',
      })
      const observer = absintheSocket.observe(socket, notifier, {
        onResult: jest.fn(),
      })

      // Don't add to subscriptions map

      expect(() =>
        absintheSocket.unobserve(socket, notifier, observer)
      ).not.toThrow()

      expect(mockChannel.off).toHaveBeenCalled()
      expect(mockChannel.push).toHaveBeenCalled()
    })

    it('should stop searching after finding subscription to remove', () => {
      const socket = absintheSocket.create(mockSocket)
      const notifier1 = absintheSocket.send(socket, {
        operation: 'subscription { test1 }',
      })
      const notifier2 = absintheSocket.send(socket, {
        operation: 'subscription { test2 }',
      })
      const observer1 = absintheSocket.observe(socket, notifier1, {
        onResult: jest.fn(),
      })

      // Add multiple subscriptions
      socket.subscriptions.set('server-sub-1', notifier1.subscriptionId)
      socket.subscriptions.set('server-sub-2', notifier2.subscriptionId)
      socket.subscriptions.set('server-sub-3', notifier1.subscriptionId) // Duplicate

      const sizeBefore = socket.subscriptions.size
      absintheSocket.unobserve(socket, notifier1, observer1)

      // Should only remove the first matching one
      expect(socket.subscriptions.size).toBe(sizeBefore - 1)
      expect(socket.subscriptions.has('server-sub-2')).toBe(true)
    })
  })

  describe('integration', () => {
    it('should handle complete subscription lifecycle', () => {
      // Create socket
      const socket = absintheSocket.create(mockSocket)

      // Setup mock to capture callbacks
      let onOkCallback: (response: any) => void = () => {}
      mockChannel.push = jest.fn().mockReturnThis()
      mockChannel.receive = jest.fn().mockImplementation((event, callback) => {
        if (event === 'ok') {
          onOkCallback = callback
        }
        return mockChannel
      })

      // Send subscription
      const notifier = absintheSocket.send(socket, {
        operation: 'subscription { userAdded { id name } }',
        variables: { filter: 'active' },
      })

      // Simulate server response with subscription ID
      onOkCallback({ subscriptionId: 'server-123' })

      // Observe results - setup data handler
      let dataHandler: (payload: any) => void = () => {}
      mockChannel.on = jest.fn().mockImplementation((event, callback) => {
        dataHandler = callback
        return 456
      })

      const onResult = jest.fn()
      const observer = absintheSocket.observe(socket, notifier, { onResult })

      // Simulate incoming subscription data
      dataHandler({
        subscriptionId: 'server-123',
        result: { userAdded: { id: 1, name: 'John' } },
      })

      expect(onResult).toHaveBeenCalledWith({
        data: { userAdded: { id: 1, name: 'John' } },
      })

      // Unobserve
      absintheSocket.unobserve(socket, notifier, observer)

      expect(mockChannel.off).toHaveBeenCalledWith('subscription:data', 456)
    })
  })
})
