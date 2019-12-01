# Statecharts

Just like [operators](/guides/intermediate/04_goingfunctional) is a declarative abstraction over plain actions, **statecharts** is a declarative abtraction over an Overmind configuration of **state** and **actions**. That means you will define your charts by:

```js
const configWithStatechart = statecharts(config, charts)
```

There are several benefits to using statecharts:

1. You will have a declarative description of what actions should be available in certain states of the application
2. Less bugs because an invalid action will not be executed if called
3. You will be able to implement and test an interaction flow without building the user interface for it
4. Your state definition is cleaned up as your **isLoading** types of state is no longer needed
5. You have a tool to do "top down" implementation instead of "bottom up"

You can basically think of a statechart as a way of limiting what actions are available to be executed in certain transition states. This concept is very old and was originally used to design machines where the user was exposed to all points of interaction, all buttons and switches, at any time. Statecharts would help make sure that at certain transition states certain buttons and switches would not operate.

A simple example of this is a Walkman. When the Walkman is in a **playing** transition state you should not be able to hit the **eject** button. On the web this might seem unnecessary as points of interaction is dynamic. We simply hide and/or disable buttons. But this is the exact problem. It is fragile. It is fragile because the UI implementation itself is all you depend on to prevent logic from running when it should not. A statechart is a much more resiliant way to ensure what logic can actually run in any given state.

## Defining a statechart

Let us imagine that we have a login flow. This login flow has 4 different **transition states**:

1. **LOGIN**. We are at the point where the user inserts a username and password
2. **AUTHENTICATING**. The user has submitted
3. **AUTHENTICATED**. The user has successfully logged in
4. **ERROR**. Something wrong happened

Let us do this properly and design this flow "top down":

```marksy
h(Example, { name: "guide/statecharts/define.ts" })
```

As you can see we have defined what transition states our login flow can be in and what actions we want available to us in each transition state. If the action points to **null** it means we stay in the same transition state. If it points to an other transition state, the execution of that action will cause that transition to occur.

Since our initial state is **LOGIN**, a call to actions defined in the other transition states would simply be ignored.

```marksy
h(Notice, null, "You might expect actions to throw an error if they are called, but not allowed to do so. This is not the case with statecharts. During development you will get a warning when this happens, but in production absolutely nothing happens. Hitting a submit button multiple times might be perfectly okay, but after the first submit the chart moves to a new state, preventing any further execution of logic on the following submits.")
```

## Transitions

If you are familiar with the concept of statemachines you might ask the question: *"Where are the transitions?"*. In Overmind we use actions to define transitions instead of having explicit transition types. That means you think about statecharts in Overmind as:

```
TRANSITION STATE -> ACTION -> NEW TRANSITION STATE
```

as opposed to:

```
TRANSITION STATE -> TRANSITION TYPE -> { NEW TRANSITION STATE, ACTION }
```

This approach has three benefits:

1. It is more explicit in the definition that a transition state configures what actions are available
2. When typing your application the actions already has a typed input, which would not be possible with a generic **transition** action
3. It is simpler concept both in code and for your brain

## Conditions

In our chart above we let the user log in even though there is no **username** or **password**. That seems a bit silly. In statecharts you can define conditions. These conditions receives the state of the configuration and returns true or false.

```marksy
h(Example, { name: "guide/statecharts/condition.ts" })
```

Now the **login** action can only be executed when there is a username and password inserted, causing a transition to the new transition state.

## State
Our initial state defined for this configuration is:

```marksy
h(Example, { name: "guide/statecharts/state.ts" })
```

As you can see we have no state indicating that we have received an error, like **hasError**. We do not have **isLoggingIn** either. There is no reason, because we have our transition states. That means the configuration is populated with some additional state by the statechart. It will actually look like this:

```js
{
  username: '',
  password: '',
  user: null,
  authenticationError: null,
  states: [['login', 'LOGIN']],
  actions: {
    changeUsername: true,
    changePassword: true,
    login: false,
    logout: false,
    tryAgain: false
  }
}
```

The **states** state is the current transition states. It is defined as an array of arrays. This indicates that we can have parallel and nested charts.

The **actions** state is a derived state. That means it automatically updates based on the current state of the chart. This is helpful for your UI implementation. It can use it to disable buttons etc. to help the user understand when certain actions are possible.

There is also a third derived state called **matches**. This derived state returns a function that allows you to figure out what state you are in:

```marksy
h(Example, { name: "guide/statecharts/matches.ts" })
```

You can also do more complex matches related to parallel and nested charts:

```marksy
h(Example, { name: "guide/statecharts/matches_multiple.ts" })
```

## Actions

Our actions are defined something like:

```marksy
h(Example, { name: "guide/statecharts/actions.ts" })
```

What to take notice of here is that with traditional Overmind we would most likely just set the **user** or the **authenticationError** directly in the **login** action. That is not the case with statcharts because our actions are the triggers for transitions. That means whenever we want to deal with transitions we create an action for it, even completely empty actions like **tryAgain**. This simplifies our chart definition and also we avoid having a generic **transition** action that would not be typed in TypeScript etc.

## Nested statecharts

With a more complicated UI we can create nested statecharts. An example of this would be a workspace UI with different tabs. You only want to allow certain actions when the related tab is active. Let us explore an example:

```marksy
h(Example, { name: "guide/statecharts/nested.ts" })
```

What to take notice of in this example is that all chart states has its own **charts** property, which allows them to be nested. The nested charts has access to the same actions and state as the parent chart.

In this example we also took advantage of the **entry** and **exit** hooks of a transition state. These also points to actions. When a transition is made into the transition state, the **entry** will run. This behavior is nested. When an exit hook exists and a transition is made away from the transition state, it will also run. This behavior is also nested of course.

## Parallel statecharts

It is also possible to define your charts in a parallel manner. The above example of projects and issues could have been defined as:

```js
export default statecharts(config, {
  issues: issuesChart,
  projects: projectsChart
})
```

Now these two charts would operate individually. This is also the case for the **charts** property on the states of a chart.


## Devtools

The Overmind devtools understands statecharts. That means you are able to get an overview of available statecharts and even manipulate them directly in the devtools.

![statecharts](/images/statecharts.png)

You will see what transition states and actions are available, and active, within each of them. You can click any active action to select it and click again to execute, or insert at payload at the top before execution.

## Summary

The point of statecharts in Overmind is to give you an abstraction over your configuration that ensures the actions can only be run in certain states. Just like operators you can choose where you want to use it. Maybe only one namespace needs a statechart, or maybe you prefer using it on all of them. The devtools has its own visualizer for the charts, which allows you to implement and test them without implementing any UI.w