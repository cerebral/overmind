import * as vscode from 'vscode'
import * as path from 'path'

type Options = {
  context: vscode.ExtensionContext
  onMessage: (command: string, text: string) => void
  onDispose: () => void
}

export class DevtoolsPanel {
  public static viewType = 'overmindDevtools'

  private readonly _options: Options

  private _panel!: vscode.WebviewPanel

  constructor(options: Options) {
    this._options = options
  }

  show(
    content: (panel: vscode.WebviewPanel) => string,
    panel?: vscode.WebviewPanel
  ) {
    if (this._panel) {
      this._panel.dispose()
    }

    this._panel =
      panel ||
      vscode.window.createWebviewPanel(
        DevtoolsPanel.viewType,
        'Overmind',
        {
          viewColumn:
            vscode.window.activeTextEditor &&
            vscode.window.activeTextEditor.viewColumn
              ? vscode.window.activeTextEditor.viewColumn
              : vscode.ViewColumn.One,
        },
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.file(
              path.join(this._options.context.extensionPath, 'devtoolsDist')
            ),
          ],
        }
      )

    this._panel.webview.onDidReceiveMessage(
      (message) => {
        this._options.onMessage(message.command, message.text)
      },
      null,
      this._options.context.subscriptions
    )

    this._panel.onDidDispose(
      () => {
        delete this._panel
        this._options.onDispose()
      },
      null,
      this._options.context.subscriptions
    )
    this._panel.webview.html = content(this._panel)
  }
}
