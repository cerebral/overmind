# Action

```marksy
h(Example, { name: "api/action"})
```

An action is where you write the logic of the application. Every action receives one argument called the **context**. This context holds the state of application, whatever effects you have defined and optionally value passed in when the action was called.

This context gives Overmind the ability to understand what state you are changing and what effects you are running. Additionally this context makes your actions highly testable as it can easily be mocked.

State changes are restricted to these actions, even though they run asynchronously, and any components currently accessing the state will render.