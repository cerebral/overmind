# Quickstart

From the command line install the Overmind package:

```marksy
h(Example, { name: "guide/quickstart/install" })
```

## Setup

Now set up a simple application like this:

```marksy
h(Example, { name: "guide/quickstart/simple_app" })
```

And fire up your application in the browser or whatever environment your user interface is to be consumed in by the users.


## VS Code
For the best experience you should install the [Overmind Devtools](https://marketplace.visualstudio.com/items?itemName=christianalfoni.overmind-devtools-vscode) extension. This will allow you to work on your application without leaving the IDE at all.

![vscode](/images/amazing_devtools.png)

## Devtool app
Alternatively you can install the standalone application of the devtools. It is highly recommended to install the package [concurrently](https://www.npmjs.com/package/concurrently). It allows you to start the devtools as you start your build process:

```marksy
h(Example, { name: "guide/quickstart/install_devtools" })
```


## FAQ

**The devtool is not responding?**

First... try to refresh your app to reconnect. If this does not work make sure that the entry point in your application is actually creating an instance of Overmind. The code **createOvermind(config)** has to run to instantiate the devtools.

**The devtool does not open in VS Code?**

Restart VS Code.
