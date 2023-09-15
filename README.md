# Overmind

Visit website for more information: [www.overmindjs.org](https://overmindjs.org).

## Maintainer needed

<https://gist.github.com/christianalfoni/f1c4bfe320dcb24c403635d9bca3fa40>

## Release procedure

```sh
git switch next
git pull
npm install # make sure any new dependencies are installed
npm run release -- --dry-run --print-release  # and check release notes
git switch master
git pull
git merge --ff-only next
git push
```

To release a new VSCode extension it's necessary to increase the version
in `packages/overmind-devtools-vscode/package.json`.
Otherwise it will be ignored.
Make also sure the token for Azure release (GitHub Actions Organization
secret: VS_MARKETPLACE_TOKEN) is still valid.
It expires after 1 year (current: 06.09.2024).

To show the right version inside the devtools standalone app,
it needs to be set in `packages/overmind-devtools/package.json`.
