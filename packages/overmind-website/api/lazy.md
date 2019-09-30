# lazy

You can lazy load configurations. You do this by giving each configuration a key with a function that returns the config when called. To actually load the configurations you can either call an effect or an action with the key of the configuration to load.

```marksy
h(Example, { name: "api/config_lazy" })
```