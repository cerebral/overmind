# rehydrate

It is possible to update the complete state of Overmind using the **rehydrate** tool. It allows you to update the state either with a state object or an array of mutations, typically collected from server side rendering.

```marksy
h(Example, { name: "api/rehydrate" })
```

The function takes into account the state structure of Overmind which is based on objects where functions are derived state. That means it will leave derived state alone, resulting in them rather updating if any of their dependencies where updated by rehydration.