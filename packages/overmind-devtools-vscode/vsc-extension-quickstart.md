# Welcome to your VS Code Extension

## What's in the folder

* This folder contains all of the files necessary for your extension.
* `package.json` - this is the manifest file in which you declare your extension and command.
  * The sample plugin registers a command and defines its title and command name. With this information VS Code can show the command in the command palette. It doesn’t yet need to load the plugin.
* `src/extension.ts` - this is the main file where you will provide the implementation of your command.
  * The file exports one function, `activate`, which is called the very first time your extension is activated (in this case by executing the command). Inside the `activate` function we call `registerCommand`.
  * We pass the function containing the implementation of the command as the second parameter to `registerCommand`.

## Get up and running straight away

* Press `F5` to open a new window with your extension loaded.
* Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.
* Set breakpoints in your code inside `src/extension.ts` to debug your extension.
* Find output from your extension in the debug console.

## Make changes

* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Explore the API

* You can open the full set of our API when you open the file `node_modules/vscode/vscode.d.ts`.

## Run tests

* Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.
* Press `F5` to run the tests in a new window with your extension loaded.
* See the output of the test result in the debug console.
* Make changes to `test/extension.test.ts` or create new test files inside the `test` folder.
  * By convention, the test runner will only consider files matching the name pattern `**.test.ts`.
  * You can create folders inside the `test` folder to structure your tests any way you want.

## Go further

* Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/testing-extension).
* [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VSCode extension marketplace.
* Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).

## Local Development

### Prerequisites

* Node.js 14+ installed
* VS Code installed
* Overmind project for testing

### Setup for Local Development

1. First, build the DevTools client:

    ```bash
    # Navigate to the client package
    cd packages/overmind-devtools-client

    # Build the client
    npm run build
    ```

2. Build the VSCode extension:

    ```bash
    # Navigate to the extension directory
    cd ../overmind-devtools-vscode

    # Build the extension
    npm run build
    npm run compile
    ```

### Running the Extension Locally

1. Open the extension in VS Code:

    ```bash
    # Open VSCode in this directory
    code .
    ```

2. Open `extension.ts` in the editor and press `F5` to start debugging
   * Select `VS Code Extension Development` if prompted
   * This will open a new VS Code window with the extension loaded

3. In the Extension Development Host window:
   * Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
   * Type and select `Overmind: Start DevTools`

4. The Overmind DevTools should appear in a new tab within VS Code

### Testing with an Overmind Project

1. Open an Overmind project in VS Code
2. Update your Overmind initialization to connect to the extension:

    ```js
    const overmind = createOvermind(config, {
      devtools: true // Will connect to default port 3031
    })
    ```

3. Run your application and it should connect to the DevTools

### Debugging Tips

* You can set breakpoints in your extension code
* Check the Debug Console for logs
* To reload the extension, press `Ctrl+R` (or `Cmd+R` on macOS) in the Extension Development Host
* Check the Output panel (select "Overmind DevTools" from the dropdown) for extension logs

### Packaging the Extension

To create a VSIX package for manual installation:

```bash
npm run package
```

This will generate a `.vsix` file in the root directory that can be installed in VS Code with:

```bash
code --install-extension <path-to-vsix-file>
```
