# action-chain

## Why

All modern frameworks has some concept of an action. The purpose of an action is to perform side effects, this being changing the state of the application or talking to the server. How you express this action is different in the different frameworks and tools, but they typically have one thing in common... they are expressed as one function with imperative code.

There is nothing wrong with imperative code, we need it, but it has some limitations:

1. When a single function with imperative code grows it quickly becomes difficult to reason about what it does

2. There is no way to track what the function does, because it is low level and we typically point directly to other libraries and functions

3. It requires a lot of dicipline to make your code reusable and composable

**action-chain** moves you into a functional world by exposing a chaining API, much like [RxJS](http://reactivex.io/rxjs/manual/overview.html). But instead of being focused on value transformation, action-chain is focused on side effects. With its "developer experience" driven implementation it allows for building developer tools that can visual all execution.

## Create an action-chain

```ts
import { Action, NoValueAction, actionChainFactory, actionFactory } from 'action-chain'

// The context holds all side effects you want to access in
// your chain. Expressed as simple objects with methods. You would
// use this to wrap existing libraries, exposing a domain specific
// api for your action chain
const context = {
  say: {
    hello: () => 'hello',
    goodbye: () => 'goodbye'
  }
}

type Context = typeof context

// The action chain manages execution of the actions and
// provides the context to them
const actionChain = actionChainFactory<Context>(context)

// You define your own factory for creating actions. It
// can define an initial value type and returns an
// action factory with the chain defined. You type out
// conditional "Action" or "NoValueAction" to allow
// typed actions to require a value and untyped actions
// to not require a value
const action = function <InitialValue>(): InitialValue extends undefined
  ? NoValueAction<Context, InitialValue>
  : Action<Context, InitialValue> {
  return actionFactory<Context, InitialValue>(actionChain)
}
```

## Define actions

```ts
const test = action<string>()
  .map((name, { say }) => `${say.hello()} ${name}`)

test('Bob') // "hello Bob"
```

## Track actions

```ts
actionChain.on('action:start', (details) => {
  /*
    {
      actionId: 0,
      executionId: 0,
    }
  */
})
actionChain.on('operator:start', (details) => {
  /*
    {
      actionId: 0,
      executionId: 0,
      operatorId: 0,
      name: '',
      type: 'map',
      path: []
    }
  */
})
actionChain.on('operator:end', (details) => {
  /*
    {
      actionId: 0,
      executionId: 0,
      operatorId: 0,
      name: '',
      type: 'map',
      path: [],
      isAsync: false,
      result: 'hello Bob'
    }
  */
})
actionChain.on('action:end', (details) => {
  /*
    {
      actionId: 0,
      executionId: 0,
    }
  */
})
```

## Operators

### do
Allows you to run effects and passes the current value a long to the next operator.
```ts
const test = action()
  .do((_, { localStorage }) => {
    localStorage.set('foo', 'bar')
  })
```

### map
Maps to a new value, passed to the next operator.
```ts
const test = action<string>()
  .map((value) => value.toUpperCase())
```

### try
If returning a promise, run paths based on resolved or rejected.
```ts
const test = action<string>()
  .try((_, { api }) => api.getUser(), {
    success: action(),
    error: action()
  })
```

### when
Executes true or false path based on boolean value.
```ts
const test = action<string>()
  .when((value) => value.length > 3, {
    true: action(),
    false: action()
  })
```

### filter
Stops execution when false.
```ts
const test = action<string>()
  .filter(() => false)
  // does not run
  .map(() => 'foo')
```

### debounce
Debounces execution.
```ts
const test = action<string>()
  .debounce(100)
  // Runs when 100 milliseconds has passed since
  // last time the "test" action was called
  .map(() => 'foo')
```

## Extend operators

```ts
import { Action, NoValueAction, actionChainFactory, actionFactory, Execution } from 'action-chain'

// There are two types of actions. Actions that takes an initial value
interface MyAction<Context, InitialValue, Value = InitialValue>
  extends MyOperators<Context, InitialValue, Value>,
    Action<Context, InitialValue, Value> {}

// And those who do not 
interface NoValueMyAction<Context, InitialValue, Value = InitialValue>
  extends MyOperators<Context, InitialValue, Value>,
    NoValueAction<Context, InitialValue, Value> {}

// You type out your operators and all of them will return either
// an action with an initial value or not, based on the "InitialValue"
// typing
interface MyOperators<Context, InitialValue, Value> {
  log(): InitialValue extends undefined
    ? NoValueMyAction<Context, InitialValue, Value>
    : MyAction<Context, InitialValue, Value>
}

// Create a new actionFactory which composes the default one and implements
// the new operators
function myActionFactory<Context, InitialValue, Value = InitialValue>(
  actionChain: ActionChain<Context>,
  initialActionId?: number,
  runOperators?: (
    value: any,
    execution: Execution,
    path: string[]
  ) => any | Promise<any>
): InitialValue extends undefined
  ? NoValueMyAction<Context, InitialValue, Value>
  : MyAction<Context, InitialValue, Value> {
  return Object.assign(
    actionFactory<Context, InitialValue, Value>(
      actionChain,
      initialActionId,
      runOperators
    ) as any,
    {
      log() {
        const operator = (value) => {
          console.log(value)
          return value
        }

        const [
          chain,
          initialActionId,
          runOperators,
        ] = this.createOperatorResult('log', '', operator)

        return myActionFactory<Context, InitialValue, Value>(
          chain,
          initialActionId,
          runOperators
        )
      },
    }
  )
}

const myAction = function<
  InitialValue = undefined
>(): InitialValue extends undefined
  ? NoValueMyAction<Context, InitialValue>
  : MyAction<Context, InitialValue> {
  return myActionFactory<Context, InitialValue>(actionChain)
}
```
