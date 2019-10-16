# reaction

Sometimes you need to react to changes to state. Typically you want to run some imperative logic related to something in the state changing. 

```js
reaction(
  // Access and return some state to react to
  (state) => state.foo,

  // Do something with the returned value
  (foo) => {},

  {
    // If you return an object or array from the state you can set this to true.
    // The reaction will run when any nested changes occur as well
    nested: false,

    // Runs the reaction immediately
    immediate: false
  }
)
```

There are two points of setting up reactions in Overmind.

## onInitialize

The onInitialize hook is where you set up reactions that lives throughout your application lifetime. The reaction function returns a function to dispose it. That means you can give effects the possibility to create and dispose of reactions in any action.

```marksy
h(Example, { name: "api/reaction_oninitialize" })
```


## components

With components you typically use reactions to manipulate DOM elements or other UI related imperative libraries.

```marksy
h(Example, { name: "api/reaction_components" })
```
