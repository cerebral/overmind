# Pipe

Overmind also provides a functional API to help you manage complex logic. This API is inspired by asynchronous flow libraries like RxJS, though it is a simpler approach. You define a pipe just like an action:

```marksy
h(Example, { name: "api/pipe" })
```

The pipe allows you to express very complex logic in a declarative way. Also each operator used can also be used with other pipes. You can even insert a pipe inside an other pipe. This kind of composition is what makes functional programming so powerful.

## debounce
When action is called multiple times within the set time limit, only the last action will move beyond the point of the debounce.

```marksy
h(Example, { name: "api/pipe_debounce" })
```

## filter
Stop execution if it returns false.

```marksy
h(Example, { name: "api/pipe_filter" })
```

## forEach
Allows you to point to an array where each item will be sent to the operator/pipe on the second argument.

```marksy
h(Example, { name: "api/pipe_forEach" })
```

## fork
Allows you to execute an operator/pipe based on the matching key.

```marksy
h(Example, { name: "api/pipe_fork" })
```

## map
Returns a new value to the pipe. If the value is a promise it will wait until promise is resolved.

```marksy
h(Example, { name: "api/pipe_map" })
```

## mutate
You are only allowed to change the state in the mutate operator.

```marksy
h(Example, { name: "api/pipe_mutate" })
```

## pipe
The pipe is an operator in itself. Use it to compose other operators and pipes.

```marksy
h(Example, { name: "api/pipe_pipe" })
```

## wait
Hold execution for set time.

```marksy
h(Example, { name: "api/pipe_wait" })
```

## when
Go down the true or false path based on the returned value.

```marksy
h(Example, { name: "api/pipe_when" })
```


