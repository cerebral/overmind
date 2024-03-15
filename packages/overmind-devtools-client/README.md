### Introduction

There are three packages related to `overmind-devtools` experience:
* [overmind-devtools-client](../overmind-devtools-client/) - "core" package that provides UI ("web client")
* [overmind-devtools](../overmind-devtools/README.md) - standalone, electron application
* [overmind-devtools-vscode](../overmind-devtools-vscode/) - VSCode extension

`overmind-devtools-client` is a core application that can be hosted by available "hosts": `overmind-devtools` and `overmind-devtools-vscode`.

![overmind-devtools-packages](./docs/assets/overmind-devtools-packages.png)

This means that this package (a reminder: we're now in `overmind-devtools-client` package of the monorepo) is **crucial** for the other two.

In case you want to improve devtools experience (UI, UX, etc.), focus on this package specifically.

### Local development
This package bundle (`bundle.js`) is further used by the companion "host" packages (mentioned before).

Hence, make sure you've build this package before development.

**HINT**: the easiest way to start local development is to run [overmind-devtools](../overmind-devtools/README.md) electron app.