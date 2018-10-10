# Modules

When you have multiple application configurations, each with their own state, effects etc. you can give them a namespace by simply importing the **modules** factory. This allows you to extends a configuration with an additional property, called *modules*. The return configuration will have the modules composed into the state, effects, actions and reactions with the selected namespaces.


```marksy
h(Example, { name: "api/modules" })
```