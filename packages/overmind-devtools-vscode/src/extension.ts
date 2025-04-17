import * as vscode from 'vscode'
import { DevtoolsPanel } from './DevtoolsPanel'
import { log } from './utils/Logger'
import * as path from 'path'

const DevtoolBackend = require('overmind-devtools-client/DevtoolBackend')

function onNewPortSubmit(newPort: string) {
  // @ts-ignore
  const vscode = (window.vscode = window.vscode || acquireVsCodeApi())
  vscode.postMessage({
    command: 'newPort',
    text: newPort,
  })
}

function onRestart() {
  // @ts-ignore
  const vscode = (window.vscode = window.vscode || acquireVsCodeApi())
  vscode.postMessage({
    command: 'restart',
  })
}

// this method is called when your extension is activated
// the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const storage = {
    get(key: string) {
      return new Promise((resolve) => {
        resolve(context.workspaceState.get(key))
      })
    },

    set(key: string, value: any) {
      return new Promise<void>((resolve) => {
        context.workspaceState.update(key, value)
        resolve()
      })
    },

    clear() {
      return new Promise<void>((resolve) => {
        resolve()
      })
    },
  }

  const devtoolBackend = DevtoolBackend.create({
    onRelaunch() {
      devtoolBackend.close()
      startDevtools()
    },
    storage,
  })

  let portChanged = false

  const devtoolsPanel = new DevtoolsPanel({
    context,
    onMessage: (command, text) => {
      switch (command) {
        case 'newPort':
          storage.set('overmind.port', text).then(() => startDevtools())
          portChanged = true
          break
        case 'restart':
          devtoolBackend.close()
          startDevtools()
          break
      }
    },
    onDispose() {
      if (portChanged) {
        portChanged = false
        return
      }
      devtoolBackend.close()
    },
  })

  let isConnecting = false

  function startDevtools(panel?: vscode.WebviewPanel) {
    if (isConnecting) return
    isConnecting = true

    storage
      .get('overmind.port')
      .then((port = 3031) => {
        try {
          devtoolBackend.close()
        } catch (err) {
          log('Error closing connection:', err)
        }

        const connectionTimeout = setTimeout(() => {
          isConnecting = false
          showErrorPanel()
        }, 5000)

        function showErrorPanel() {
          devtoolsPanel.show(
            () =>
              devtoolBackend.getChangePortMarkup(
                port,
                onNewPortSubmit,
                onRestart
              ),
            panel
          )
        }

        devtoolBackend
          .connect(port)
          .then(() => {
            clearTimeout(connectionTimeout)
            isConnecting = false

            const content = (panel: vscode.WebviewPanel) => {
              let scriptFile: vscode.Uri | string

              if (
                process.env.VSCODE_DEBUG_MODE ||
                vscode.workspace
                  .getConfiguration()
                  .get('overmind.devmode.enabled')
              ) {
                scriptFile = <string>(
                  vscode.workspace
                    .getConfiguration()
                    .get('overmind.devmode.url')
                )
              } else {
                const onDiskPath = vscode.Uri.file(
                  path.join(context.extensionPath, 'devtoolsDist', 'bundle.js')
                )
                scriptFile = panel.webview.asWebviewUri(onDiskPath)
              }

              try {
                const markup = devtoolBackend.getMarkup(
                  scriptFile,
                  port,
                  onNewPortSubmit,
                  onRestart
                )

                if (typeof markup !== 'string') {
                  return `<html><body>Error loading devtools content</body></html>`
                }

                return markup.replace(
                  '</head>',
                  `<style>
:root {
--colors-background: var(--vscode-editor-background) !important;
--colors-foreground: var(--vscode-activityBar-background) !important;
--colors-border: var(--vscode-dropdown-border) !important;
--colors-text: var(--vscode-editor-foreground) !important;
--colors-highlight: var(--vscode-breadcrumb-focusForeground) !important;
}
</style></head>`
                )
              } catch (err) {
                return `<html><body>Error generating devtools content: ${err}</body></html>`
              }
            }

            devtoolsPanel.show(content, panel)
          })
          .catch(() => {
            clearTimeout(connectionTimeout)
            isConnecting = false
            showErrorPanel()
          })
      })
      .catch(() => {
        isConnecting = false
      })
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('overmind-devtools.start', () =>
      startDevtools()
    )
  )

  if (vscode.window.registerWebviewPanelSerializer) {
    vscode.window.registerWebviewPanelSerializer(DevtoolsPanel.viewType, {
      async deserializeWebviewPanel(webViewPanel: vscode.WebviewPanel) {
        startDevtools(webViewPanel)
      },
    })
  }
}

export function deactivate() {
  try {
    const existingPanel = DevtoolsPanel.findPanel()
    if (existingPanel) {
      existingPanel.dispose()
    }
  } catch (err) {
    log('Error during deactivation:', err)
  }
}
