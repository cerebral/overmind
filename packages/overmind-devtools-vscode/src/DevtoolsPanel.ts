import * as vscode from 'vscode'
import { getNonce } from './utils/getNonce'
import { log } from './utils/Logger'

type Options = {
  context: vscode.ExtensionContext
  onMessage: (command: string, text: string) => void
  onDispose: () => void
}

export class DevtoolsPanel {
  public static readonly viewType = 'overmindDevtools'
  private panel: vscode.WebviewPanel | undefined
  private context: vscode.ExtensionContext
  private callbacks: {
    onMessage: (command: string, text: string) => void
    onDispose: () => void
  }

  private static currentPanel: DevtoolsPanel | undefined
  private static openPanels: vscode.WebviewPanel[] = []

  constructor(options: Options) {
    this.context = options.context
    this.callbacks = {
      onMessage: options.onMessage,
      onDispose: options.onDispose,
    }
  }

  public show(
    content: string | ((panel: vscode.WebviewPanel) => string),
    panel?: vscode.WebviewPanel
  ) {
    try {
      // Dispose existing panels except the one we're reusing
      DevtoolsPanel.openPanels.forEach((existingPanel) => {
        if (!panel || existingPanel !== panel) {
          existingPanel.dispose()
        }
      })

      DevtoolsPanel.openPanels = panel ? [panel] : []

      if (
        DevtoolsPanel.currentPanel &&
        DevtoolsPanel.currentPanel.panel &&
        (!panel || DevtoolsPanel.currentPanel.panel !== panel)
      ) {
        DevtoolsPanel.currentPanel = undefined
      }

      if (!this.panel) {
        if (panel) {
          this.panel = panel
          this.panel.webview.options = this.getWebviewOptions()
          this.setupPanel()
        } else {
          this.panel = vscode.window.createWebviewPanel(
            DevtoolsPanel.viewType,
            'Overmind DevTools',
            vscode.ViewColumn.Active,
            this.getWebviewOptions()
          )

          DevtoolsPanel.openPanels.push(this.panel)
          this.setupPanel()
        }

        DevtoolsPanel.currentPanel = this
      }

      const nonce = getNonce()

      let contentString =
        typeof content === 'function' ? content(this.panel) : content

      contentString = contentString
        .replace(
          '<head>',
          `<head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; 
          img-src ${this.panel.webview.cspSource} https:; 
          script-src ${this.panel.webview.cspSource} 'nonce-${nonce}'; 
          style-src ${this.panel.webview.cspSource} https: 'unsafe-inline';
          font-src https:;
          connect-src ws: wss: http: https:;">
      `
        )
        .replace(/<script/g, `<script nonce="${nonce}"`)

      this.panel.webview.html = contentString
      this.panel.reveal(vscode.ViewColumn.Active, true)
    } catch (err) {
      log('Error showing panel:', err)
    }
  }

  private setupPanel() {
    if (!this.panel) return

    this.panel.webview.onDidReceiveMessage(
      (message) => {
        if (message && message.command) {
          this.callbacks.onMessage(message.command, message.text)
        }
      },
      undefined,
      this.context.subscriptions
    )

    this.panel.onDidDispose(
      () => {
        const index = DevtoolsPanel.openPanels.indexOf(this.panel!)
        if (index !== -1) {
          DevtoolsPanel.openPanels.splice(index, 1)
        }

        this.panel = undefined

        if (DevtoolsPanel.currentPanel === this) {
          DevtoolsPanel.currentPanel = undefined
        }

        this.callbacks.onDispose()
      },
      null,
      this.context.subscriptions
    )
  }

  public isActive(): boolean {
    return this.panel !== undefined
  }

  public static findPanel(): vscode.WebviewPanel | undefined {
    return DevtoolsPanel.openPanels.find(
      (panel) => panel.viewType === DevtoolsPanel.viewType
    )
  }

  private getWebviewOptions(): vscode.WebviewOptions &
    vscode.WebviewPanelOptions {
    return {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.file(this.context.extensionPath),
        vscode.Uri.file(`${this.context.extensionPath}/devtoolsDist`),
        this.context.globalStorageUri,
        vscode.Uri.parse(this.context.extensionUri.toString()).with({
          path: '/',
        }),
      ],
    }
  }
}
