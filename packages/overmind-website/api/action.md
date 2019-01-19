# Action

```marksy
h(Example, { name: "api/action"})
```

An action is where you write the logic of the application. Every action receives one argument and that is the configuration of your application:

`{ state, actions, effects }`

This *injected* configuration allows Overmind to understand from where you are chaing state and running effects. You can also use other actions defined in your application. Additionally with *injection* your actions become highly testable as it can easily be mocked.

State changes are restricted to these actions. That means if you try to change the state outside of an action you will get an error. The state changes are also scoped to the action. That means it does not matter if you perform the state change asynchronously, either by defining the action as an **async** function or for example use a **setTimeout**. You can change the state at any time within the action.