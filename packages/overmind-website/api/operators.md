# Operators

Overmind also provides a functional API to help you manage complex logic. This API is inspired by asynchronous flow libraries like RxJS, though it is designed to manage application state and effects. If you want to create and use a traditional action "operator style" you define it like this:

```marksy
h(Example, { name: "api/operators" })
```

The **action** function is an operator that allows you to express logic just like you do in a traditional action. The **fromOperator** function converts an operator to a callable action that you can add to the configuration of your app. That means whenever you want to call an operator from a component, or somewhere else, you have to attach the operator on the configuration using the **fromOperator** function.

Operators are small composable pieces of logic that can be combined in many ways. This allows you to express complexity in a declarative way. You typically use the **pipe** operator in combination with the other operators to do this:

```marksy
h(Example, { name: "api/operators_pipe" })
```

Any of these operators can be used with other operators. You can even insert a pipe inside an other pipe. This kind of composition is what makes functional programming so powerful.


## action
This operator takes a normal action and converts it to an operator so that it can be combined with other operators. You use this operator whenever you want to change the state of the app, but you can run effects as well. Just like a normal action.

```marksy
h(Example, { name: "api/operators_operator_action" })
```

## debounce
When action is called multiple times within the set time limit, only the last action will move beyond the point of the debounce.

```marksy
h(Example, { name: "api/operators_operator_debounce" })
```

## filter
Stop execution if it returns false.

```marksy
h(Example, { name: "api/operators_operator_filter" })
```

## forEach
Allows you to pass each item of a value that is an array to the operator/pipe on the second argument.

```marksy
h(Example, { name: "api/operators_operator_forEach" })
```

## fork
Allows you to execute an operator/pipe based on the matching key.

```marksy
h(Example, { name: "api/operators_operator_fork" })
```

## map
Returns a new value to the pipe. If the value is a promise it will wait until promise is resolved.

```marksy
h(Example, { name: "api/operators_operator_map" })
```

## parallel
Will run every operator and wait for all of them to finish before moving on. Works like *Promise.all*.

```marksy
h(Example, { name: "api/operators_operator_parallel" })
```

## pipe
The pipe is an operator in itself. Use it to compose other operators and pipes.

```marksy
h(Example, { name: "api/operators_operator_pipe" })
```

## wait
Hold execution for set time.

```marksy
h(Example, { name: "api/operators_operator_wait" })
```

## when
Go down the true or false path based on the returned value.

```marksy
h(Example, { name: "api/operators_operator_when" })
```


