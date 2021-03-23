import { AppMessage } from './overmind/types'

type Message = {
  appName: string
  message: AppMessage<any>
}

type MessageCallback = (message: Message) => void

class WebsocketConnector {
  private nextEvaluationId = 0
  private parser = Promise.resolve()
  private callbacks: {
    [event: string]: Function[]
  } = {}

  private socket: WebSocket
  private messagesBeforeConnected: Array<[string, any, any]> = []
  private isOpen = false
  private schedulePing() {
    setTimeout(() => {
      this.send('ping')
    }, 1000 * 10)
  }

  public connect(
    port: string | number // TODO: return Promise so we can wait for it
  ) {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        reject(new Error('TODO: Socked already open, what now?'))
      }
      this.socket = new WebSocket(`ws://localhost:${port}?devtools=1`)
      this.socket.onmessage = (message) => {
        const parsedMessage = JSON.parse(message.data)

        if (parsedMessage.type === 'pong') {
          this.schedulePing()
        } else {
          this.emit(parsedMessage.type, parsedMessage.data)
        }
      }
      this.socket.onopen = () => {
        resolve()
        this.isOpen = true
        this.messagesBeforeConnected.forEach((message) => {
          this.send(...message)
        })
        this.messagesBeforeConnected.length = 0
        this.schedulePing()
      }
      this.socket.onclose = (reason) => {
        console.log('Socket closed', reason)
        setTimeout(() => this.connect(port), 1000)
      }
    })
  }

  emit(event: string, data?: any) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach((cb) => cb(data))
    }
  }

  on(event: string, cb: Function) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = []
    }

    this.callbacks[event].push(cb)
  }

  off(event, cb) {
    if (this.callbacks[event]) {
      this.callbacks[event].splice(this.callbacks[event].indexOf(cb), 1)
    }
  }

  send(event: string, data?: any, onEvaluated?: Function) {
    if (!this.isOpen) {
      this.messagesBeforeConnected.push([event, data, onEvaluated])
      return
    }
    const nextEvaluationId = this.nextEvaluationId++

    this.socket.send(
      JSON.stringify({
        type: event,
        data,
        evaluate: onEvaluated ? nextEvaluationId : undefined,
      })
    )

    if (onEvaluated) {
      const cb = (data) => {
        if (data.id === nextEvaluationId) {
          this.off('evaluated', cb)
          onEvaluated(data.error ? data.error : null, data.data)
        }
      }
      this.on('evaluated', cb)
    }
  }
}

export class BackendConnector extends WebsocketConnector {
  onMessage = (onMessage: MessageCallback) => {
    this.on('message', (message) => {
      onMessage(message)
    })
  }

  onDisconnect = (onDisconnect: (name: string) => void) => {
    this.on('disconnect', (name) => {
      onDisconnect(name)
    })
  }

  sendMessage(appName: string, eventName: string, payload: object = null) {
    this.send('message', {
      appName,
      type: eventName,
      data: payload,
    })
  }

  relaunch() {
    this.send('relaunch')
  }

  openChromeDevtools() {
    this.send('openChromeDevtools')
  }
}

export default BackendConnector
