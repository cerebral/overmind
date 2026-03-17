import BackendConnector from '../BackendConnector'

export const connector = new BackendConnector()

export const platform = {
  isElectron(): boolean {
    return (
      !!window.electronEnv?.isRenderer && !!window.electronEnv?.electronVersion
    )
  },

  isVSCodeExtension(): boolean {
    return (
      typeof window !== 'undefined' &&
      (window.vscode !== undefined ||
        typeof window.acquireVsCodeApi === 'function')
    )
  },

  isBrowser(): boolean {
    return !this.isElectron() && !this.isVSCodeExtension()
  },
}

export const config = {
  getPort(): number {
    // Try configured value, then URL parameter, then default
    if (window.__OVERMIND_DEVTOOLS_BACKEND_PORT__) {
      const portNum = Number(window.__OVERMIND_DEVTOOLS_BACKEND_PORT__)
      if (!isNaN(portNum) && portNum !== 0) {
        return portNum
      }
    }

    const urlParams = new URLSearchParams(location.search)
    const portParam = urlParams.get('port')
    if (portParam && !isNaN(Number(portParam))) {
      return Number(portParam)
    }

    return 3031
  },

  getConfiguration() {
    return {
      port: this.getPort(),
    }
  },
}

export const utils = {
  confirmDialog(text: any): boolean {
    return window.confirm(text)
  },
}

export const storage = {
  clear() {
    return new Promise<void>((resolve, reject) => {
      connector.send('storage:clear', null, (error: any) => {
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
      connector.send('storage:get', { key }, (err: any, data: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },
  set(key: any, data: any) {
    return new Promise<void>((resolve, reject) => {
      connector.send(
        'storage:set',
        {
          key,
          data,
        },
        (err: any) => {
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

export const splitPane = {
  addDragListeners(onMove: (e: MouseEvent) => void, onUp: () => void) {
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  },

  removeDragListeners(onMove: (e: MouseEvent) => void, onUp: () => void) {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  },
}
