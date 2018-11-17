# Config

The base configuration of your application is:

`{ state, actions, effects, reactions }`

When your application grows it will be necessary to split up your configuration. Overmind provides some helpers allowing you to structure and scale up your configuration.

## merge
Allows you to merge configurations together.

```marksy
h(Example, { name: "api/config_merge" })
```

Note that merge can be useful to combine a root configuration with namespaced configuration.

## namespaced
Allows you to namespace configurations by a key.

```marksy
h(Example, { name: "api/config_namespaced" })
```