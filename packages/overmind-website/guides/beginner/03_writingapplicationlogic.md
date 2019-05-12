# Writing application logic

Overmind has a concept of an **action**. An action is just a method where the first argument is injected. This first argument is called the **context** and it holds the state of the application, whatever effects you have defined and references to the other actions.

You define actions under the **actions** key of your application configuration.

```marksy
h(Example, { name: "guide/writingapplicationlogic/define" })
```

## Using the context

The context has three parts. **state**, **effects** and **actions**. Typically you destructure the context to access these pieces directly.

```marksy
h(Example, { name: "guide/writingapplicationlogic/using" })
```

When you point to either of these you will always point to the "top of the application. That means if you use namespaces or other nested structures the context is always the root context of the application.

```marksy
h(Notice, null, "The reason Overmind only has a root context is because isolated contexts/domains creates more harm than good. Specifically when you develop your applicaiton it is very difficult to know exactly how the domains of your application will look like. What state, actions and effects belongs together. By only having a root context you can always point to any domain from any other domain allowing you to easily manage cross domain logic and not having to refactor every time your domain model breaks.")
```

## Passing values

When you call actions you can pass a single value. This value appears as the second argument, after the context.

```marksy
h(Example, { name: "guide/writingapplicationlogic/value" })
```

When you call an action from an action you do so using the **actions** passed on the context, as this is the evaluated action that can be called.

```marksy
h(Example, { name: "guide/writingapplicationlogic/call" })
```

## Organizing actions

Some of your actions will be called from the outside, publically, maybe from a component. Other actions are only used internall, either being passed to an effect or just holding some piece of logic you want to reuse. The convention to separate these two actions is to use a namespace of **internal**.

```marksy
h(Example, { name: "guide/writingapplicationlogic/organizing" })
```

## Summary

The action in Overmind is a powerful concept. It allows you to define and organize logic that always has access to the core components of your application. State, effects and actions.