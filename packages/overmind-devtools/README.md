# Overmind DevTools Electron

## Introduction

This package is one of three packages related to `overmind-devtools`.

If you're looking for a little deeper insight about these, please check [overmind-devtools-client](../overmind-devtools-client/README.md).

## Usage

For normal use, you can run the DevTools directly using npx:

```sh
npx overmind-devtools
```

To run the local production version, you can run:

```sh
npm start
```

## Local Development

Make sure you first [built](../overmind-devtools-client/README.md) the devtools UI core:

```sh
cd ../overmind-devtools-client
npm run build
```

After that, run the devtools server on `overmind-devtools-client`:

```sh
npm run start:devtools
```

Then, you can run the local development version of the DevTools Electron app:

```sh
cd ../overmind-devtools
npm start
```

This will:

1. Build the DevTools electron app
2. Launch the Electron app with Chrome DevTools open for debugging

You can also open Chrome DevTools from the application menu: Select **Application > Open Chrome DevTools**.

![overmind-devtools-debugging](./docs/assets/overmind-devtools-debugging.png)
