import BackendConnector from '../BackendConnector'

export const connector = new BackendConnector()

export const utils = {
  confirmDialog(text): boolean {
    return window.confirm(text)
  },
  getPort() {
    return Number(
      window.__OVERMIND_DEVTOOLS_BACKEND_PORT__ ||
        location.search.split('=')[1] ||
        3031
    )
  },
}

export const storage = {
  clear() {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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
