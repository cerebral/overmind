import * as withAbsintheSocket from '@absinthe/socket'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql/language/printer'
import { Socket as PhoenixSocket } from 'phoenix'

import gqlTag from 'graphql-tag'
import { GraphQLError } from 'graphql'

export interface Query<Result extends any, Payload extends any = void> {
  (payload: Payload): Result
}

type Variable = string | number | boolean | null

interface NoPayloadSubscription<R> {
  (action: (result: R) => void): void
  dispose(): void
  disposeWhere(cb: (variables: { [variables: string]: Variable }) => boolean)
}

interface PayloadSubscription<P, R> {
  (payload: P, action: (result: R) => void): void
  dispose(): void
  disposeWhere(cb: (variables: { [variables: string]: Variable }) => boolean)
}

interface Subscription {
  variables: { [key: string]: Variable }
  dispose: () => void
}

type Http = {
  endpoint: string
  headers?: () => Dom.RequestInit['headers']
  options?: Dom.RequestInit
}

type Ws =
  | {
      endpoint: string
      params?: () => { [key: string]: string | number | boolean }
    }
  | (() => PhoenixSocket | null)

type Queries = {
  rawQueries?: {
    [key: string]: (payload: any) => any
  }
  queries?: {
    [key: string]: (payload: any) => any
  }
  rawMutations?: {
    [key: string]: (payload: any) => any
  }
  mutations?: {
    [key: string]: (payload: any) => any
  }
  subscriptions?: {
    [key: string]: (payload: any) => any
  }
}

type RawResult<T extends any> = Promise<{
  data?: T
  extensions?: any
  headers: Dom.Headers
  status: number
  errors?: GraphQLError[]
}>

export type Graphql<T extends Queries> = {
  initialize(http: Http, ws?: Ws): void
} & {
  rawQueries: {
    [N in keyof T['rawQueries']]: T['rawQueries'][N] extends (
      payload: infer P
    ) => infer R
      ? P extends void
        ? () => RawResult<R>
        : (payload: P) => RawResult<R>
      : never
  }
  queries: {
    [N in keyof T['queries']]: T['queries'][N] extends (
      payload: infer P
    ) => infer R
      ? P extends void
        ? () => Promise<R>
        : (payload: P) => Promise<R>
      : never
  }
  rawMutations: {
    [N in keyof T['rawMutations']]: T['rawMutations'][N] extends (
      payload: infer P
    ) => infer R
      ? P extends void
        ? () => RawResult<R>
        : (payload: P) => RawResult<R>
      : never
  }
  mutations: {
    [N in keyof T['mutations']]: T['mutations'][N] extends (
      payload: infer P
    ) => infer R
      ? P extends void
        ? () => Promise<R>
        : (payload: P) => Promise<R>
      : never
  }
  subscriptions: {
    [N in keyof T['subscriptions']]: T['subscriptions'][N] extends (
      payload: infer P
    ) => infer R
      ? P extends void
        ? NoPayloadSubscription<R>
        : PayloadSubscription<P, R>
      : never
  }
}

function createError(message: string) {
  throw new Error(`OVERMIND-GRAPHQL: ${message}`)
}

type Literals = string | ReadonlyArray<string>

export const gql = (
  literals: Literals,
  ...placeholders: any[]
): Query<any, any> => gqlTag(literals, ...placeholders) as any

const _clients: { [url: string]: GraphQLClient } = {}
const _subscriptions: {
  [query: string]: Subscription[]
} = {}

export const graphql: <T extends Queries>(queries: T) => Graphql<T> = (
  queries
) => {
  let _http: Http
  let _ws: Ws

  function getClient(): GraphQLClient | null {
    if (_http) {
      const headers = // eslint-disable-next-line
        typeof _http.headers === 'function'
          ? _http.headers()
          : _http.options && _http.options.headers
          ? _http.options.headers
          : {}

      if (_clients[_http.endpoint]) {
        _clients[_http.endpoint].setHeaders(headers)
      } else {
        _clients[_http.endpoint] = new GraphQLClient(_http.endpoint, {
          ..._http.options,
          headers,
        })
      }

      return _clients[_http.endpoint]
    }

    return null
  }

  let wsClient: PhoenixSocket | null = null
  function getWsClient(): PhoenixSocket | null {
    if (_ws && !wsClient) {
      const socket =
        typeof _ws === 'function'
          ? _ws()
          : new PhoenixSocket(_ws.endpoint, {
              params: _ws.params ? _ws.params() : undefined,
            })

      if (!socket) {
        throw createError(
          'You are trying to create a Socket for subscriptions, but there is no socket or socket information provided'
        )
      }
      wsClient = withAbsintheSocket.create(socket)
      return wsClient
    }

    return wsClient
  }

  const evaluatedQueries = {
    rawQueries: Object.keys(queries.rawQueries || {}).reduce((aggr, key) => {
      aggr[key] = (variables) => {
        const query = queries.rawQueries![key] as any
        const client = getClient()

        if (client) {
          return client.rawRequest(print(query), variables)
        }

        throw createError(
          'You are running a query, though there is no HTTP endpoint configured'
        )
      }
      return aggr
    }, {}),
    queries: Object.keys(queries.queries || {}).reduce((aggr, key) => {
      aggr[key] = (variables) => {
        const query = queries.queries![key] as any
        const client = getClient()

        if (client) {
          return client.request(print(query), variables)
        }

        throw createError(
          'You are running a query, though there is no HTTP endpoint configured'
        )
      }
      return aggr
    }, {}),
    rawMutations: Object.keys(queries.rawMutations || {}).reduce(
      (aggr, key) => {
        aggr[key] = (variables) => {
          const query = queries.rawMutations![key] as any
          const client = getClient()

          if (client) {
            return client.rawRequest(print(query), variables)
          }

          throw createError(
            'You are running a query, though there is no HTTP endpoint configured'
          )
        }
        return aggr
      },
      {}
    ),
    mutations: Object.keys(queries.mutations || {}).reduce((aggr, key) => {
      aggr[key] = (variables) => {
        const query = queries.mutations![key] as any
        const client = getClient()

        if (client) {
          return client.request(print(query), variables)
        }

        throw createError(
          'You are running a query, though there is no HTTP endpoint configured'
        )
      }
      return aggr
    }, {}),
    subscriptions: Object.keys(queries.subscriptions || {}).reduce(
      (aggr, key) => {
        const query = queries.subscriptions![key] as any
        const queryString = print(query)

        if (!_subscriptions[queryString]) {
          _subscriptions[queryString] = []
        }

        function subscription(arg1, arg2) {
          const client = getWsClient()

          if (client) {
            const variables = arg2 ? arg1 : {}
            const action = arg2 || arg1
            const notifier = withAbsintheSocket.send(client, {
              operation: queryString,
              variables,
            })

            const observer = withAbsintheSocket.observe(client, notifier, {
              onResult: ({ data }) => {
                action(data)
              },
            })

            _subscriptions[queryString].push({
              variables,
              dispose: () =>
                withAbsintheSocket.unobserve(client, notifier, observer),
            })
          } else {
            throw createError('There is no ws client available for this query')
          }
        }

        subscription.dispose = () => {
          _subscriptions[queryString].forEach((sub) => {
            try {
              sub.dispose()
            } catch (e) {
              // Ignore, it probably throws an error because we weren't subscribed in the first place
            }
          })
          _subscriptions[queryString].length = 0
        }

        subscription.disposeWhere = (cb) => {
          _subscriptions[queryString] = _subscriptions[queryString].reduce<
            Subscription[]
          >((subAggr, sub) => {
            if (cb(sub.variables)) {
              try {
                sub.dispose()
              } catch (e) {
                // Ignore, it probably throws an error because we weren't subscribed in the first place
              }
              return subAggr
            }
            return subAggr.concat(sub)
          }, [])
        }

        aggr[key] = subscription

        return aggr
      },
      {}
    ),
  }

  return {
    initialize(http: Http, ws?: Ws) {
      _http = http
      if (ws) {
        _ws = ws
      }
    },
    ...evaluatedQueries,
  } as any
}
