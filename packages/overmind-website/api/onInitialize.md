# onInitialize

If you need to run logic as the application initializes you can use the **onInitialize** hook. This is defined as an action and it receives the application instance as the input value. You can do whatever you want here. Set initial state, run an action, configure a router etc.

```marksy
h(Example, { name: "api/onInitialize" })
```

When you use **modules** all the *onInitialize* will run in parallel.