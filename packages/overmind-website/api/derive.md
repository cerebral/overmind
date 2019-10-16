# derive

You can add derived state to your application. You access derived state like any other value, there is no need to call it as a function. The derived value is cached and will only update when any accessed state changes.

```marksy
h(Example, { name: "api/derive" })
```

The function defining your derived state receives two arguments. The first argument is the object the derived function is attached to. Ideally you use this argument to produce your derived state, though you can access the second argument which is the root state of the application. The root state allows you to access any state.


```marksy
h(Notice, null, "Accessing **rootState** might cause unnecessary updates to the derived function as it will track more state, though typically not an issue")
```

An other use case for derived is to return a function. This allows you to insert functions into your state tree which can execute logic, even based on existing state. Even the function itself might be changed out based on the state of the application.

```marksy
h(Example, { name: "api/derive_function" })
```

```marksy
h(Notice, null, "Using state inside the returned function will not be tracked. You have to access the state in the scope of the derived function")
```