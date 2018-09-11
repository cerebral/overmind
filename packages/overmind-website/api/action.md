# Action

```marksy
h(Example, { name: "api/action"})
```

An action allows you to compose pieces of logic into an execution. You typically execute an action based on some user interaction in your application, but it could be everything from a route change to a websocket message as well.

Actions are defined with a powerful chaining API which gives control of the execution itself. The asynchronocity of your execution is completely abstracted away, you only think about the logical order of execution and Overmind takes care of the rest.

The action is built up by **operators**, methods called on the action itself. These operators describes the execution logic.

## compose
```marksy
h(Example, { name: "api/action_compose" })
```

Typically used to merge in a separate action. This action will runs as if it was defined with the source action.

## debounce
```marksy
h(Example, { name: "api/action_debounce" })
```

Typically used to only continue execution of the last action call if multiple action calls has been made in the time limit passed in.

The only argument is the time limit in milliseconds the operator should prevent action calls to continue. When the an action call has waited for the milliseconds defined, without any new action calls has been made, the execution will continue.

## do
```marksy
h(Example, { name: "api/action_do" })
```

Typically used to fire off an effect without caring about its returned result, if any.

Only argument is a function that receives the **effects** registered in the application as the first argument, and the current **value** of the action as the second argument. Any returned value will be ignored, though you can return a promise to indicate that the do operator needs to be resolved. The current value of the action will be passed to the next operator.

## filter
```marksy
h(Example, { name: "api/action_filter" })
```

Typically used to stop execution related to some condition.

The first argument is a function that receives the **effects** registered in the application as the first argument, and the current **value** as the second argument. If the function returns the value `false`, synchronously or asynchronously, the execution of the action will stop.

## fork
```marksy
h(Example, { name: "api/action_fork" })
```
Typically used to fork out execution when a value can result in multiple complex executions.

The first argument is a function that receives the **effects** as the first argument and the current **value** as the second. The function is expected to return a value, either synchronously or asynchronously, that matches the paths passed as the second argument to the fork operator.


## map
```marksy
h(Example, { name: "api/action_map" })
```

Typically used to get values from an effect or transform the current value of the action.

Only argument is a function that receives the **effects** registered in the application as the first argument, and the current **value** of the action as the second argument. The returned value will become the new value of the action.

## mutate
```marksy
h(Example, { name: "api/action_mutation" })
```

Used to change the state of the application.

Only argument is a function that receives the **state** as the first argument and the current **value** of the action as the second argument. This operator is the only operator that is allowed to mutate the state of the application.

## parallel
```marksy
h(Example, { name: "api/action_parallel" })
```

Typically used to run multiple composed actions in parallel. "In parallel" means that one executes after the other synchronously, but if any of them are doing something asynchronous the execution of the source action will not continue until all of them are done.

The parallel operator does not return a value.

## try
```marksy
h(Example, { name: "api/action_try" })
```

Typically used to explicitly handle potentially thrown errors from an effect.

The first argument is a function that receives the **effects** registered in the application as the first argument, and the current **value** as the second argument. The second argument to the operator are two paths, **success** and **error** which are respectively executed based on the success of the first argument function.

## when
```marksy
h(Example, { name: "api/action_when" })
```

Typically used to fork execution based on a thruthy or falsy value.

The first argument is a function that receives the **effects** registered in the application as the first argument, and the current **value** as the second argument. The second argument to the operator are two paths, **true** and **false** which are respectively executed based on the thruthyness of the returned value in the first argument function, which can be synchronous or asynchronous.