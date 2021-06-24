<h1 align="center">
  <br>
    <img src="https://github.com/cerebral/overmind/blob/next/logo.png?raw=true" alt="logo" width="100">
  <br>
  Overmind Devtools for VS Code
  <br>
  <br>
</h1>

<h4 align="center">Devtools for Overmind - <a href="https://overmindjs.org/">https://overmindjs.org/</a></h4>

## Getting started


1. Grab extension from [marketplace](https://marketplace.visualstudio.com/items?itemName=christianalfoni.overmind-devtools-vscode)
1. Run the command `Overmind Devtools: Start`
1. Start your app

### Enabling devtools in your app
Make sure your app has devtools enabled. This is done by passing `devtools: true` to `createOvermind`
```js
const overmind = createOvermind(config, {
  devtools: true // defaults to 'localhost:3031'
})
```

If you for some reason can't use port 3031 you can change this via the `overmind-devtools.port` setting.


## Features

- explore state
- etc etc


## Extension Settings

This extension contributes the following settings:

* `overmind-devtools.port`: port for devtools backend server
* `overmind-devtools.verbose`: toggle verbose logging

## Release Notes

TODO