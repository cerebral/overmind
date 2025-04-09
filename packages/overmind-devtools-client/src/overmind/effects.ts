import BackendConnector from '../BackendConnector'

export const connector = new BackendConnector()

export const config = {
  getPort(): number {
    // Try to get port from configured value
    if (window.__OVERMIND_DEVTOOLS_BACKEND_PORT__) {
      const portNum = Number(window.__OVERMIND_DEVTOOLS_BACKEND_PORT__)
      if (!isNaN(portNum) && portNum !== 0) {
        return portNum
      }
    }

    // Try URL parameter
    const urlParams = new URLSearchParams(location.search)
    const portParam = urlParams.get('port')
    if (portParam && !isNaN(Number(portParam))) {
      return Number(portParam)
    }

    // Default port
    return 3031
  },

  getConfiguration() {
    return {
      port: this.getPort(),
    }
  },
}

export const utils = {
  confirmDialog(text): boolean {
    return window.confirm(text)
  },
}

export const storage = {
  clear() {
    return new Promise<void>((resolve, reject) => {
      connector.send('storage:clear', null, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  },
  get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      connector.send('storage:get', { key }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },
  set(key, data) {
    return new Promise<void>((resolve, reject) => {
      connector.send(
        'storage:set',
        {
          key,
          data,
        },
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  },
}
