export type Listener = {
  once: boolean
  cb: ({}) => void
}

export class EventEmitter<T> {
  private events = new Map<keyof T, Listener[]>()

  emit<K extends keyof T>(event: K, msg: T[K]) {
    const listeners = this.events.get(event) || []

    for (let i = listeners.length - 1; i >= 0; i--) {
      const listener = listeners[i]

      listener.cb(msg)

      if (listener.once) {
        listeners.splice(i, 1)
      }
    }
  }

  emitAsync<K extends keyof T>(event: K, msg: T[K]) {
    const listeners = this.events.get(event) || []

    setTimeout(() => {
      for (let i = listeners.length - 1; i >= 0; i--) {
        const listener = listeners[i]

        listener.cb(msg)

        if (listener.once) {
          listeners.splice(i, 1)
        }
      }
    })
  }

  on<K extends keyof T>(event: K, cb: (msg: T[K]) => void) {
    this.addListener(event, cb, false)
  }

  once<K extends keyof T>(event: K, cb: (msg: T[K]) => void) {
    this.addListener(event, cb, true)
  }

  private addListener(event: keyof T, cb: ({}) => void, once: boolean) {
    const listeners = this.events.get(event) || []

    listeners.push({
      once,
      cb,
    })

    this.events.set(event, listeners)
  }
}
