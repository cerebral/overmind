import * as vscode from 'vscode'
import { DevtoolsPanel } from './DevtoolsPanel'
import { log } from './utils/Logger'
import * as path from 'path'

const DevtoolBackend = require('overmind-devtools-client/DevtoolBackend')

function onNewPortSubmit(newPort: string) {
  // @ts-ignore
  const vscode = (window.vscode =
    // @ts-ignore
    window.vscode || acquireVsCodeApi())
  vscode.postMessage({
    command: 'newPort',
    text: newPort,
  })
}

function onRestart() {
  // @ts-ignore
  const vscode = (window.vscode =
    // @ts-ignore
    window.vscode || acquireVsCodeApi())
  vscode.postMessage({
    command: 'restart',
  })
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
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
  const devtoolsPanel = new DevtoolsPanel({
    context,
    onMessage: (command, text) => {
      switch (command) {
        case 'newPort':
          storage.set('overmind.port', text).then(() => startDevtools())
          break
        case 'restart':
          devtoolBackend.close()
          startDevtools()
          break
      }
    },
    onDispose() {
      devtoolBackend.close()
    },
  })

  function startDevtools(panel?: vscode.WebviewPanel) {
    storage.get('overmind.port').then((port = 3031) => {
      devtoolBackend
        .connect(port)
        .then(() => {
          const content = (panel: vscode.WebviewPanel) => {
            let scriptFile: vscode.Uri | string

            if (
              process.env.VSCODE_DEBUG_MODE ||
              vscode.workspace
                .getConfiguration()
                .get('overmind.devmode.enabled')
            ) {
              scriptFile = <string>(
                vscode.workspace.getConfiguration().get('overmind.devmode.url')
              )
            } else {
              const onDiskPath = vscode.Uri.file(
                path.join(context.extensionPath, 'devtoolsDist', 'bundle.js')
              )
              scriptFile = panel.webview.asWebviewUri(onDiskPath)
            }

            return devtoolBackend
              .getMarkup(scriptFile, port, onNewPortSubmit, onRestart)
              .replace(
                '</head>',
                `
  <style>
  :root {
  --colors-background: var(--vscode-editor-background) !important;
  --colors-foreground: var(--vscode-activityBar-background) !important;
  --colors-border: var(--vscode-dropdown-border) !important;
  --colors-text: var(--vscode-editor-foreground) !important;
  --colors-highlight: var(--vscode-breadcrumb-focusForeground) !important;
  }
  </style>
  </head>        
  `
              )
          }

          devtoolsPanel.show(content)
        })
        .catch(() => {
          devtoolsPanel.show(
            devtoolBackend.getChangePortMarkup(
              port,
              onNewPortSubmit,
              onRestart
            ),
            panel
          )
        })
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

// this method is called when your extension is deactivated
export function deactivate() {
  log('Extension deactivated')
}
