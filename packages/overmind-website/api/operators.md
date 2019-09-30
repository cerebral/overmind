# operators

Overmind also provides a functional API to help you manage complex logic. This API is inspired by asynchronous flow libraries like RxJS, though it is designed to manage application state and effects. If you want to create and use a traditional action "operator style" you define it like this:

```marksy
h(Example, { name: "api/operators" })
```

The **mutate** function is one of many operators. Operators are small composable pieces of logic that can be combined in many ways. This allows you to express complexity in a declarative way. You typically use the **pipe** operator in combination with the other operators to do this:

```marksy
h(Example, { name: "api/operators_pipe" })
```

Any of these operators can be used with other operators. You can even insert a pipe inside an other pipe. This kind of composition is what makes functional programming so powerful.

## catchError

**async**

This operator runs if any of the previous operators throws an error. It allows you to manage that error by changing your state, run effects or even return a new value to the next operators. 

```marksy
h(Example, { name: "api/operators_operator_catcherror" })
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

```marksy
h(TypescriptNotice, null, "You have to use ENUM for these keys for the typing to work")
```

## map
Returns a new value to the pipe. If the value is a promise it will wait until promise is resolved.

```marksy
h(Example, { name: "api/operators_operator_map" })
```

## mutate

**async**

You use this operator whenever you want to change the state of the app, but you can run effects as well. Any returned value is ignored.

```marksy
h(Example, { name: "api/operators_operator_action" })
```

## noop

This operator does absolutely nothing. Is useful when paths of execution is not supposed to do anything.

```marksy
h(Example, { name: "api/operators_operator_noop" })
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

This operator allows you to run side effects. You can not change state and you can not return a value.

```marksy
h(Example, { name: "api/operators_operator_run" })
```

## throttle
This operator allows you to ensure that if an action is called, the next action will only continue past this point if a certain duration has passed. Typically used when an action is called many times in a short amount of time.

```marksy
h(Example, { name: "api/operators_operator_throttle" })
```

## tryCatch
This operator allows you to scope execution and manage errors. This operator does not return a new value to the execution.

```marksy
h(Example, { name: "api/operators_operator_trycatch" })
```

## wait
Hold execution for set time.

```marksy
h(Example, { name: "api/operators_operator_wait" })
```

## waitUntil
Wait until a state condition is true.

```marksy
h(Example, { name: "api/operators_operator_waituntil" })
```

## when
Go down the true or false path based on the returned value.

```marksy
h(Example, { name: "api/operators_operator_when" })
```


