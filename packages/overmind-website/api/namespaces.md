# Namespaces

```marksy
<Example name="api/namespaces" view />
```

When you have multiple application configurations, each with their own state, effects etc. you can give them a namespace by simply importing the modules and pass them into the **namespaces** factory.

## Dynamic

```marksy
<Example name="api/namespaces_dynamic" view />
```

When you create a module you can export a function instead of an object. This function will receive that key used by **namespaces** to attach the module to the application configuration. Use this **namespace** argument to point correctly to state, actions etc. as they are now namespaced.