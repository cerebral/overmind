# Operators

Overmind also provides a functional API to help you manage complex logic. This API is inspired by asynchronous flow libraries like RxJS, though it is a simpler approach. You define an operator just like an action:

```marksy
h(Example, { name: "api/operators" })
```

Operators forces you to split up your logic in tiny composable pieces that has a specific purpose. This allows you to express complexity in a declarative way. You typically use the **pipe** operator in combination with the other operators to do this:

```marksy
h(Example, { name: "api/operators_pipe" })
```

Any of these operators can be used with other operators. You can even insert a pipe inside an other pipe. This kind of composition is what makes functional programming so powerful.

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
Allows you to point to an array where each item will be sent to the operator/pipe on the second argument.

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

## mutate
You are only allowed to change the state in the mutate operator.

```marksy
h(Example, { name: "api/operators_operator_mutate" })
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

## run
This operator is useful to run effects. It will just pass the current value a long. You may return a promise which will hold further
execution until it is resolved.

```marksy
h(Example, { name: "api/operators_operator_run" })
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


