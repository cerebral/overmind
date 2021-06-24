import { SERIALIZE } from './rehydrate'

export type Message = {
  type: string
  data?: object
}

export type DevtoolsMessage = {
  type: string
  appName: string
  data: any
}

export class Devtools {
  private safeClassNames: Set<string> = new Set()
  private unsafeClassNames: Set<string> = new Set()
  private circularReferenceCache: any[] = []
  private buffer: string[] = []
  private serializer = Promise.resolve()
  private ws: WebSocket
  private isConnected: boolean = false
  private doReconnect: boolean = false
  private hasWarnedReconnect: boolean = false
  private reconnectInterval: number = 10000
  private name: string
  constructor(name: string) {
    this.name =
      typeof location !== 'undefined' &&
      location.search.includes('OVERMIND_DEVTOOL')
        ? name + ' (Overmind Devtool)'
        : name
  }

  connect = (host: string, onMessage: (message: Message) => void) => {
    host = host || 'localhost:3031'

    this.ws = new WebSocket(`ws://${host}?name=${this.name}`)
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.appName !== this.name) {
        return
      }
      onMessage(data)
    }
    this.ws.onopen = () => {
      this.isConnected = true
      this.flushBuffer()
    }
    this.ws.onerror = () => {
      console.error(
        `OVERMIND DEVTOOLS: Not able to connect. You are trying to connect to "${host}", but there was no devtool there. Try the following:
        
          - Make sure you are running the latest version of the devtools, using "npx overmind-devtools@latest" or install latest extension for VSCode
          - Close the current tab and open a new one
          - Make sure the correct port is configured in the devtools
        `
      )
    }
    this.ws.onclose = () => {
      this.isConnected = false

      if (this.doReconnect && !this.hasWarnedReconnect) {
        console.warn(
          'Debugger application is not running on selected port... will reconnect automatically behind the scenes'
        )
        this.hasWarnedReconnect = true
      }

      if (this.doReconnect) {
        this.reconnect(host, onMessage)
      }
    }
  }

  private reconnect(host, onMessage) {
    setTimeout(
      () =>
        this.connect(
          host,
          onMessage
        ),
      this.reconnectInterval
    )
  }

  send(message: Message) {
    const safeClassNames = this.safeClassNames
    const unsafeClassNames = this.unsafeClassNames
    const circularReferenceCache = this.circularReferenceCache

    this.sendMessage(
      JSON.stringify(message, function(_, value) {
        if (typeof value === 'function') {
          return '[Function]'
        }

        if (this.__CLASS__) {
          return value
        }

        if (value && value[SERIALIZE]) {
          return {
            __CLASS__: true,
            name: value.constructor.name,
            value,
          }
        }

        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value) &&
          value.constructor &&
          value.constructor.name !== 'Object'
        ) {
          if (circularReferenceCache.includes(value)) {
            return `[CIRCULAR REFERENCE: ${value.constructor.name}]`
          }

          circularReferenceCache.push(value)

          if (
            !safeClassNames.has(value.constructor.name) &&
            !unsafeClassNames.has(value.constructor.name)
          ) {
            try {
              JSON.stringify(value)
              safeClassNames.add(value.constructor.name)
            } catch {
              unsafeClassNames.add(value.constructor.name)
            }
          }

          if (safeClassNames.has(value.constructor.name)) {
            return {
              __CLASS__: true,
              name: value.constructor.name,
              value,
            }
          } else {
            return `[${value.constructor.name || 'NOT SERIALIZABLE'}]`
          }
        }

        return value
      })
    )
    circularReferenceCache.length = 0
  }

  private sendMessage = (payload: string) => {
    if (!this.isConnected) {
      this.buffer.push(payload)
      return
    }
    this.ws.send(`{"appName":"${this.name}","message":${payload}}`)
  }

  private flushBuffer = async () => {
    this.buffer.forEach((payload) => {
      this.sendMessage(payload)
    })
    this.buffer.length = 0
  }
}
