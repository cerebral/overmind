### Introduction

This package is one of three packages related to `overmind-devtools`.

If you're looking for a little deeper insight about these, please check [overmind-devtools-client](../overmind-devtools-client/README.md).

### Local development

**PREREQUISITE**: make sure you firstly [built](../overmind-devtools-client/README.md) devtools UI core so that it can be hosted by this package (electron application).

Considering the above prerequisite is satisfied, run the following steps:
1. Build the host:
```sh
npm run build
```
2. Run the application:
```sh
npm run prod
```
3. Use `Application` tab and then clicking on `Open Chrome DevTools`:

![overmind-devtools-debugging](./docs/assets/overmind-devtools-debugging.png)