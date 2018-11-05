# OnInitialize

If you need to run logic as the application initializes you can use the **onInitialize** hook. This is defined as an action and it receives the actions of the application as the input value. You can do whatever you want here. Run an action, configure a router etc.

Typically you would conceptually think of **onInitialize** as "where you bind outside events to actions". So any effect you have configured would typically be configured with what actions to trigger related to events in the effect.

```marksy
h(Example, { name: "api/onInitialize" })
```

When you use **modules** all the *onInitialize* will run in parallel.