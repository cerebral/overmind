# OnInitialize

If you need to run logic as the application initializes you can use the **onInitialize** hook. This is defined as a callback and it receives the instance of the application. You can do whatever you want here. Run an action, configure a router etc.

```marksy
h(Example, { name: "api/onInitialize" })
```

Overmind will run this logic as a promise, meaning that you can return an action you want to run and can later outside of the application detect when the initialization is done. This promise is named **initialized** and can be used as such:

When you use **modules** all the *onInitialize* will run in parallel.