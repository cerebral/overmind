import { Socket as PhoenixSocket, Channel } from 'phoenix'

/**
 * Custom Absinthe Socket implementation
 *
 * This replaces the abandoned @absinthe/socket package with a direct
 * implementation using Phoenix Channels. It provides the same API for
 * working with Absinthe GraphQL subscriptions over Phoenix.
 *
 * Absinthe uses Phoenix channels for subscriptions, which is different
 * from the standard GraphQL WebSocket protocol.
 */

export interface AbsintheSocket {
  phoenixSocket: PhoenixSocket
  channel: Channel
  subscriptions: Map<string, any>
}

export interface Notifier {
  subscriptionId: string
  absintheSocket: AbsintheSocket
}

export interface Observer {
  subscriptionId: string
  ref: number
}

export const absintheSocket = {
  /**
   * Create an Absinthe socket wrapper around a Phoenix socket
   */
  create(phoenixSocket: PhoenixSocket): AbsintheSocket {
    phoenixSocket.connect()
    const channel = phoenixSocket.channel('__absinthe__:control')

    channel
      .join()
      .receive('ok', () => {
        // Channel joined successfully
      })
      .receive('error', (reason) => {
        console.error('Failed to join Absinthe control channel:', reason)
      })

    return {
      phoenixSocket,
      channel,
      subscriptions: new Map(),
    }
  },

  /**
   * Send a GraphQL subscription request
   */
  send(
    absintheSocket: AbsintheSocket,
    request: { operation: string; variables?: any }
  ): Notifier {
    const subscriptionId = `subscription:${Date.now()}:${Math.random()
      .toString(36)
      .substr(2, 9)}`

    absintheSocket.channel
      .push('doc', {
        query: request.operation,
        variables: request.variables || {},
      })
      .receive('ok', (response) => {
        if (response.subscriptionId) {
          absintheSocket.subscriptions.set(
            response.subscriptionId,
            subscriptionId
          )
        }
      })
      .receive('error', (error) => {
        console.error('Subscription error:', error)
      })

    return {
      subscriptionId,
      absintheSocket,
    }
  },

  /**
   * Observe subscription results
   */
  observe(
    absintheSocket: AbsintheSocket,
    notifier: Notifier,
    callbacks: { onResult: (result: { data: any }) => void }
  ): Observer {
    const ref = absintheSocket.channel.on(
      'subscription:data',
      (payload: any) => {
        const subscriptionId = absintheSocket.subscriptions.get(
          payload.subscriptionId
        )
        if (subscriptionId === notifier.subscriptionId) {
          callbacks.onResult({ data: payload.result })
        }
      }
    )

    return {
      subscriptionId: notifier.subscriptionId,
      ref,
    }
  },

  /**
   * Unsubscribe and clean up
   */
  unobserve(
    absintheSocket: AbsintheSocket,
    notifier: Notifier,
    observer: Observer
  ): void {
    absintheSocket.channel.off('subscription:data', observer.ref)

    // Clean up subscription
    absintheSocket.channel.push('unsubscribe', {
      subscriptionId: notifier.subscriptionId,
    })

    // Remove from subscriptions map
    for (const [key, value] of absintheSocket.subscriptions.entries()) {
      if (value === notifier.subscriptionId) {
        absintheSocket.subscriptions.delete(key)
        break
      }
    }
  },
}
