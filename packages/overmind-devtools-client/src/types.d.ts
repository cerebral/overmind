declare global {
  interface Window {
    __OVERMIND_DEVTOOLS_BACKEND_PORT__: string

    // Electron environment
    process?: {
      type: string
      versions?: {
        electron?: string
        [key: string]: any
      }
      [key: string]: any
    }
    require?: (module: string) => any

    // VSCode environment
    vscode?: any
    acquireVsCodeApi?: () => any
  }
}

declare module '*.woff2'

export {}
