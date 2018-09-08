# Overmind

Visit website for more information: [www.overmindjs.org](https://www.overmindjs.org).

## Release procedure

```sh
$ git checkout next
$ git pull
$ npm install # make sure any new dependencies are installed
$ npm install --no-save nodegit  # needed for "repo-cooker --release"
￼$ npm run release -- --dry-run --print-release  # and check release notes
￼$ git checkout master
$ git pull
￼$ git merge --ff-only next
￼$ git push
```