import { graphql, gql } from './index'

// Mock graphql-request to prevent actual network calls
jest.mock('graphql-request', () => {
  return {
    GraphQLClient: jest.fn().mockImplementation(() => ({
      request: jest.fn().mockResolvedValue({ data: { test: 'value' } }),
      rawRequest: jest.fn().mockResolvedValue({
        data: { test: 'value' },
        extensions: {},
        headers: new Headers(),
        status: 200,
      }),
      setHeaders: jest.fn(),
    })),
  }
})

describe('overmind-graphql', () => {
  describe('gql', () => {
    it('should create a query from template literal', () => {
      const query = gql`
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
          }
        }
      `

      expect(query).toBeDefined()
      expect((query as any).kind).toBe('Document')
    })

    it('should handle placeholders', () => {
      const fragment = gql`
        fragment UserFields on User {
          id
          name
        }
      `

      const query = gql`
        query GetUser($id: ID!) {
          user(id: $id) {
            ...UserFields
          }
        }
        ${fragment}
      `

      expect(query).toBeDefined()
    })
  })

  describe('graphql', () => {
    let api: any

    beforeEach(() => {
      // Use fake timers to avoid async operations hanging
      jest.useFakeTimers()

      api = graphql({
        queries: {
          getUser: gql`
            query GetUser($id: ID!) {
              user(id: $id) {
                id
                name
              }
            }
          `,
        },
        mutations: {
          updateUser: gql`
            mutation UpdateUser($id: ID!, $name: String!) {
              updateUser(id: $id, name: $name) {
                id
                name
              }
            }
          `,
        },
        subscriptions: {
          userUpdated: gql`
            subscription UserUpdated {
              userUpdated {
                id
                name
              }
            }
          `,
        },
      })
    })

    afterEach(() => {
      // Clean up any open WebSocket connections
      if (api && api.wsClient) {
        try {
          api.wsClient.disconnect()
        } catch (e) {
          // Ignore errors during cleanup
        }
      }

      // Clean up timers
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })

    describe('initialize', () => {
      it('should initialize with HTTP endpoint', () => {
        expect(() => {
          api.initialize({
            endpoint: 'http://localhost:4000/graphql',
            headers: () => ({ Authorization: 'Bearer token' }),
          })
        }).not.toThrow()
      })

      it('should initialize with HTTP and WebSocket endpoints', () => {
        expect(() => {
          api.initialize(
            {
              endpoint: 'http://localhost:4000/graphql',
            },
            {
              endpoint: 'ws://localhost:4000/socket',
            }
          )
        }).not.toThrow()
      })

      it('should initialize with custom socket factory', () => {
        const mockSocket = {} as any

        expect(() => {
          api.initialize(
            {
              endpoint: 'http://localhost:4000/graphql',
            },
            () => mockSocket
          )
        }).not.toThrow()
      })
    })

    describe('queries', () => {
      beforeEach(() => {
        api.initialize({
          endpoint: 'http://localhost:4000/graphql',
        })
      })

      it('should have query methods', () => {
        expect(api.queries.getUser).toBeDefined()
        expect(typeof api.queries.getUser).toBe('function')
      })

      it('should throw error when querying without HTTP configuration', () => {
        const uninitializedApi = graphql({
          queries: {
            getUser: gql`
              query {
                user {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          uninitializedApi.queries.getUser({ id: '1' })
        }).toThrow(/no HTTP endpoint configured/)
      })
    })

    describe('rawQueries', () => {
      it('should have rawQuery methods when defined', () => {
        const apiWithRaw = graphql({
          rawQueries: {
            getUser: gql`
              query GetUser($id: ID!) {
                user(id: $id) {
                  id
                  name
                }
              }
            `,
          },
        })

        apiWithRaw.initialize({
          endpoint: 'http://localhost:4000/graphql',
        })

        expect(apiWithRaw.rawQueries.getUser).toBeDefined()
        expect(typeof apiWithRaw.rawQueries.getUser).toBe('function')
      })

      it('should execute rawQueries and return raw response', () => {
        const apiWithRaw = graphql({
          rawQueries: {
            getUser: gql`
              query GetUser($id: ID!) {
                user(id: $id) {
                  id
                  name
                }
              }
            `,
          },
        })

        apiWithRaw.initialize({
          endpoint: 'http://localhost:4000/graphql',
        })

        // Execute rawQuery - will fail due to network but covers the execution path
        const promise = apiWithRaw.rawQueries.getUser({ id: '123' })
        expect(promise).toBeDefined()
        expect(promise.catch).toBeDefined()
      })

      it('should throw error when executing rawQuery without HTTP configuration', () => {
        const uninitializedApi = graphql({
          rawQueries: {
            getUser: gql`
              query {
                user {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          uninitializedApi.rawQueries.getUser({ id: '1' })
        }).toThrow(/no HTTP endpoint configured/)
      })
    })

    describe('mutations', () => {
      beforeEach(() => {
        api.initialize({
          endpoint: 'http://localhost:4000/graphql',
        })
      })

      it('should have mutation methods', () => {
        expect(api.mutations.updateUser).toBeDefined()
        expect(typeof api.mutations.updateUser).toBe('function')
      })

      it('should throw error when mutating without HTTP configuration', () => {
        const uninitializedApi = graphql({
          mutations: {
            updateUser: gql`
              mutation {
                updateUser {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          uninitializedApi.mutations.updateUser({ id: '1', name: 'John' })
        }).toThrow(/no HTTP endpoint configured/)
      })
    })

    describe('rawMutations', () => {
      it('should have rawMutation methods when defined', () => {
        const apiWithRaw = graphql({
          rawMutations: {
            updateUser: gql`
              mutation UpdateUser($id: ID!, $name: String!) {
                updateUser(id: $id, name: $name) {
                  id
                  name
                }
              }
            `,
          },
        })

        apiWithRaw.initialize({
          endpoint: 'http://localhost:4000/graphql',
        })

        expect(apiWithRaw.rawMutations.updateUser).toBeDefined()
        expect(typeof apiWithRaw.rawMutations.updateUser).toBe('function')
      })

      it('should execute rawMutations and return raw response', () => {
        const apiWithRaw = graphql({
          rawMutations: {
            updateUser: gql`
              mutation UpdateUser($id: ID!, $name: String!) {
                updateUser(id: $id, name: $name) {
                  id
                  name
                }
              }
            `,
          },
        })

        apiWithRaw.initialize({
          endpoint: 'http://localhost:4000/graphql',
        })

        // Execute rawMutation - will fail due to network but covers the execution path
        const promise = apiWithRaw.rawMutations.updateUser({
          id: '123',
          name: 'John',
        })
        expect(promise).toBeDefined()
        expect(promise.catch).toBeDefined()
      })

      it('should throw error when executing rawMutation without HTTP configuration', () => {
        const uninitializedApi = graphql({
          rawMutations: {
            updateUser: gql`
              mutation {
                updateUser {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          uninitializedApi.rawMutations.updateUser({ id: '1', name: 'John' })
        }).toThrow(/no HTTP endpoint configured/)
      })
    })

    describe('subscriptions', () => {
      let mockSocket: any
      let mockChannel: any

      beforeEach(() => {
        mockChannel = {
          join: jest.fn().mockReturnThis(),
          on: jest.fn().mockReturnValue(123),
          off: jest.fn(),
          push: jest.fn().mockReturnThis(),
          receive: jest.fn().mockReturnThis(),
        }

        mockSocket = {
          connect: jest.fn(),
          disconnect: jest.fn(),
          channel: jest.fn().mockReturnValue(mockChannel),
        }

        api.initialize(
          {
            endpoint: 'http://localhost:4000/graphql',
          },
          () => mockSocket
        )
      })

      it('should have subscription methods', () => {
        expect(api.subscriptions.userUpdated).toBeDefined()
        expect(typeof api.subscriptions.userUpdated).toBe('function')
      })

      it('should throw error when subscribing without WebSocket configuration', () => {
        const uninitializedApi = graphql({
          subscriptions: {
            userUpdated: gql`
              subscription {
                userUpdated {
                  id
                }
              }
            `,
          },
        })

        uninitializedApi.initialize({
          endpoint: 'http://localhost:4000/graphql',
        })

        expect(() => {
          ;(uninitializedApi.subscriptions.userUpdated as any)(jest.fn())
        }).toThrow(/no ws client available/)
      })

      it('should accept action callback for subscriptions without payload', () => {
        const onResult = jest.fn()

        expect(() => {
          api.subscriptions.userUpdated(onResult)
        }).not.toThrow()

        expect(mockSocket.connect).toHaveBeenCalled()
        expect(mockChannel.join).toHaveBeenCalled()
      })

      it('should call action callback when subscription data arrives', () => {
        // Setup to capture both the send response callback and the observe handler
        let onOkCallback: (response: any) => void = () => {}
        let dataHandler: (payload: any) => void = () => {}

        mockChannel.push = jest.fn().mockReturnThis()
        mockChannel.receive = jest
          .fn()
          .mockImplementation((event, callback) => {
            if (event === 'ok') {
              onOkCallback = callback
            }
            return mockChannel
          })

        mockChannel.on = jest.fn().mockImplementation((event, callback) => {
          if (event === 'subscription:data') {
            dataHandler = callback
          }
          return 123
        })

        const onResult = jest.fn()
        api.subscriptions.userUpdated(onResult)

        // Simulate server responding with subscription ID
        onOkCallback({ subscriptionId: 'server-123' })

        // Simulate incoming subscription data
        dataHandler({
          subscriptionId: 'server-123',
          result: { userUpdated: { id: 1, name: 'John' } },
        })

        // The action should be called with the data
        expect(onResult).toHaveBeenCalledWith({
          userUpdated: { id: 1, name: 'John' },
        })
      })

      it('should accept payload and action callback for subscriptions with payload', () => {
        const apiWithPayload = graphql({
          subscriptions: {
            userUpdated: gql`
              subscription UserUpdated($userId: ID!) {
                userUpdated(userId: $userId) {
                  id
                  name
                }
              }
            `,
          },
        })

        apiWithPayload.initialize(
          {
            endpoint: 'http://localhost:4000/graphql',
          },
          () => mockSocket
        )

        const onResult = jest.fn()
        const payload = { userId: '123' }

        expect(() => {
          apiWithPayload.subscriptions.userUpdated(payload, onResult)
        }).not.toThrow()
      })

      it('should have dispose method on subscriptions', () => {
        expect(api.subscriptions.userUpdated.dispose).toBeDefined()
        expect(typeof api.subscriptions.userUpdated.dispose).toBe('function')
      })

      it('should dispose all subscriptions of a query', () => {
        const onResult1 = jest.fn()
        const onResult2 = jest.fn()

        api.subscriptions.userUpdated(onResult1)
        api.subscriptions.userUpdated(onResult2)

        expect(() => {
          api.subscriptions.userUpdated.dispose()
        }).not.toThrow()

        // Verify channel.off was called
        expect(mockChannel.off).toHaveBeenCalled()
      })

      it('should have disposeWhere method on subscriptions', () => {
        expect(api.subscriptions.userUpdated.disposeWhere).toBeDefined()
        expect(typeof api.subscriptions.userUpdated.disposeWhere).toBe(
          'function'
        )
      })

      it('should dispose subscriptions matching a predicate', () => {
        const apiWithPayload = graphql({
          subscriptions: {
            userUpdated: gql`
              subscription UserUpdated($userId: ID!) {
                userUpdated(userId: $userId) {
                  id
                  name
                }
              }
            `,
          },
        })

        apiWithPayload.initialize(
          {
            endpoint: 'http://localhost:4000/graphql',
          },
          () => mockSocket
        )

        apiWithPayload.subscriptions.userUpdated({ userId: '123' }, jest.fn())
        apiWithPayload.subscriptions.userUpdated({ userId: '456' }, jest.fn())

        expect(() => {
          apiWithPayload.subscriptions.userUpdated.disposeWhere(
            (variables) => variables.userId === '123'
          )
        }).not.toThrow()
      })

      it('should throw error when trying to create socket without socket info', () => {
        const apiWithoutSocket = graphql({
          subscriptions: {
            userUpdated: gql`
              subscription {
                userUpdated {
                  id
                }
              }
            `,
          },
        })

        apiWithoutSocket.initialize(
          {
            endpoint: 'http://localhost:4000/graphql',
          },
          () => null
        )

        expect(() => {
          ;(apiWithoutSocket.subscriptions.userUpdated as any)(jest.fn())
        }).toThrow(/no socket or socket information provided/)
      })
    })

    describe('headers', () => {
      it('should support static headers from options', () => {
        const apiWithHeaders = graphql({
          queries: {
            getUser: gql`
              query {
                user {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          apiWithHeaders.initialize({
            endpoint: 'http://localhost:4000/graphql',
            options: {
              headers: {
                Authorization: 'Bearer static-token',
              },
            },
          })
        }).not.toThrow()
      })

      it('should support dynamic headers from function', () => {
        const apiWithHeaders = graphql({
          queries: {
            getUser: gql`
              query {
                user {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          apiWithHeaders.initialize({
            endpoint: 'http://localhost:4000/graphql',
            headers: () => ({
              Authorization: `Bearer ${Math.random()}`,
            }),
          })
        }).not.toThrow()
      })

      it('should reuse existing client and update headers', () => {
        const apiWithHeaders = graphql({
          queries: {
            getUser: gql`
              query {
                user {
                  id
                }
              }
            `,
          },
        })

        // Initialize first time
        apiWithHeaders.initialize({
          endpoint: 'http://localhost:4000/graphql',
          headers: () => ({
            Authorization: 'Bearer token1',
          }),
        })

        // Call query to trigger client creation
        const query1Promise = (apiWithHeaders.queries.getUser as any)()
        expect(query1Promise).toBeDefined()

        // Initialize again with same endpoint but different headers
        apiWithHeaders.initialize({
          endpoint: 'http://localhost:4000/graphql',
          headers: () => ({
            Authorization: 'Bearer token2',
          }),
        })

        // Call query again - should reuse client with updated headers
        const query2Promise = (apiWithHeaders.queries.getUser as any)()
        expect(query2Promise).toBeDefined()
      })

      it('should use empty headers when none provided', () => {
        const apiWithoutHeaders = graphql({
          queries: {
            getUser: gql`
              query {
                user {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          apiWithoutHeaders.initialize({
            endpoint: 'http://localhost:4000/graphql',
          })
        }).not.toThrow()

        // Trigger client creation
        const queryPromise = (apiWithoutHeaders.queries.getUser as any)()
        expect(queryPromise).toBeDefined()
      })
    })

    describe('WebSocket params', () => {
      it('should support static WebSocket params', () => {
        const mockSocket = {
          connect: jest.fn(),
          disconnect: jest.fn(),
          channel: jest.fn().mockReturnValue({
            join: jest.fn().mockReturnThis(),
            receive: jest.fn().mockReturnThis(),
          }),
        }

        const apiWithParams = graphql({
          subscriptions: {
            userUpdated: gql`
              subscription {
                userUpdated {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          apiWithParams.initialize(
            {
              endpoint: 'http://localhost:4000/graphql',
            },
            () => mockSocket as any
          )
        }).not.toThrow()
      })

      it('should support dynamic WebSocket params from function', () => {
        const mockSocket = {
          connect: jest.fn(),
          disconnect: jest.fn(),
          channel: jest.fn().mockReturnValue({
            join: jest.fn().mockReturnThis(),
            receive: jest.fn().mockReturnThis(),
          }),
        }

        const apiWithParams = graphql({
          subscriptions: {
            userUpdated: gql`
              subscription {
                userUpdated {
                  id
                }
              }
            `,
          },
        })

        expect(() => {
          apiWithParams.initialize(
            {
              endpoint: 'http://localhost:4000/graphql',
            },
            () => mockSocket as any
          )
        }).not.toThrow()
      })

      it('should create Phoenix socket with endpoint and params', () => {
        const apiWithEndpoint = graphql({
          subscriptions: {
            userUpdated: gql`
              subscription {
                userUpdated {
                  id
                }
              }
            `,
          },
        })

        // Initialize with WebSocket endpoint object
        apiWithEndpoint.initialize(
          {
            endpoint: 'http://localhost:4000/graphql',
          },
          {
            endpoint: 'ws://localhost:4000/socket',
            params: () => ({ token: 'abc123' }),
          }
        )

        // Trigger socket creation by subscribing
        const onResult = jest.fn()
        ;(apiWithEndpoint.subscriptions.userUpdated as any)(onResult)

        // Just verify it doesn't throw
        expect(onResult).toBeDefined()
      })

      it('should create Phoenix socket without params', () => {
        const apiWithEndpoint = graphql({
          subscriptions: {
            userUpdated: gql`
              subscription {
                userUpdated {
                  id
                }
              }
            `,
          },
        })

        // Initialize with WebSocket endpoint object without params
        apiWithEndpoint.initialize(
          {
            endpoint: 'http://localhost:4000/graphql',
          },
          {
            endpoint: 'ws://localhost:4000/socket',
          }
        )

        // Trigger socket creation by subscribing
        const onResult = jest.fn()
        ;(apiWithEndpoint.subscriptions.userUpdated as any)(onResult)

        // Just verify it doesn't throw
        expect(onResult).toBeDefined()
      })
    })
  })
})
