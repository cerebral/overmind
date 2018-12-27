import { IS_PROXY } from 'proxy-state-tree'
import isPlainObject from 'is-plain-obj'

export type Message = {
  type: string
  data?: object
}

export function safeValue(value) {
  if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null &&
    !isPlainObject(value)
  ) {
    return `[${value.constructor.name || 'NOT SERIALIZABLE'}]`
  }

  return value && !value[IS_PROXY] && isPlainObject(value)
    ? Object.keys(value).reduce((aggr, key) => {
        aggr[key] = safeValue(value[key])

        return aggr
      }, {})
    : value
}

export function safeValues(values) {
  return values.map(safeValue)
}

const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

export class Devtools {
  private buffer: string[] = []
  private ws: WebSocket
  private isConnected: boolean = false
  private doReconnect: boolean = false
  private hasWarnedReconnect: boolean = false
  private reconnectInterval: number = 10000
  private name: string
  constructor(name: string) {
    this.name = name
  }
  connect = (host: string, onMessage: (message: Message) => void) => {
    host = host || 'localhost:3031'

    this.ws = new WebSocket(`ws://${host}`)
    this.ws.onmessage = (event) => onMessage(JSON.parse(event.data))
    this.ws.onopen = () => {
      this.isConnected = true
      this.sendBuffer()
    }
    this.ws.onerror = () => {}
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
    const stringifiedMessage = JSON.stringify(message)
    ;(window['__zone_symbol__setTimeout'] || setTimeout)(() => {
      this.buffer.push(stringifiedMessage)
      this.sendBuffer()
    })
  }
  private sendBuffer = throttle(function() {
    if (this.isConnected && this.buffer.length) {
      this.ws.send(
        `{ "appName": "${this.name}", "messages": [${this.buffer.join(',')}] }`
      )
      this.buffer.length = 0
    }
  }, 50)
}
