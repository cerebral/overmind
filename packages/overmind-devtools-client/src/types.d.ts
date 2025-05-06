declare global {
  interface Window {
    __OVERMIND_DEVTOOLS_BACKEND_PORT__: string

    // Electron
    electronEnv?: {
      isRenderer: boolean
      electronVersion: string
    }
    electronAPI?: {
      setNewPort: (port: number) => void
      restart: () => void
      onZoomIn: (callback: () => void) => void
      onZoomOut: (callback: () => void) => void
      onZoomReset: (callback: () => void) => void
    }

    // VSCode environment
    vscode?: any
    acquireVsCodeApi?: () => any
  }
}

declare module '*.woff2'

export {}
