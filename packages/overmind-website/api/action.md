# Action

```marksy
h(Example, { name: "api/action"})
```

An action is where you write the logic of the application. Every action receives one argument called the **context**. This context holds the state of application, whatever effects you have defined and optionally value passed in when the action was called.

This context gives Overmind the ability to understand what state you are changing and what effects you are running. Additionally this context makes your actions highly testable as it can easily be mocked.

State changes are restricted to these actions. That means if you try to change the state outside of an action you will get an error. The state changes are also scoped to the action. That means it does not matter if you perform the state change asynchronously, either by defining the action as an **async** function or for example use a **setTimeout**. You can change the state at any time within the action.