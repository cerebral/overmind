# statecharts

Statecharts is a configuration factory, just like **merge**, **namespaced** and **lazy**. It allows you to restrict what actions are to be run in certain states.

## statechart

The factory function you use to wrap an Overmind configuration.

```marksy
h(Example, { name: "api/statecharts_statechart" })
```

## initial

Define the initial state of the chart. When a parent chart enters a transition state, any nested chart will move to its initial transition state.

```marksy
h(Example, { name: "api/statecharts_initial" })
```

## states
Defines the transition states of the chart. The chart can only be in one of these states at any point in time.

```marksy
h(Example, { name: "api/statecharts_states" })
```

## entry
When a transition state is entered you can optionally run an action. It also runs if it is the initial state.

```marksy
h(Example, { name: "api/statecharts_entry" })
```

## exit
When a transition state is changed, any exit defined in current transition state will be run first. Nested charts in a transition state with an exit defined will run before parents.

```marksy
h(Example, { name: "api/statecharts_exit" })
```

## on
Unlike traditional statecharts Overmind uses its actions as transition types. This keeps a cleaner chart definition and when using Typescript the actions will have correct typing related to their payload. The actions defined are the only actions allowed to run. They can optionally lead to a new transition state, even conditionally lead to a new transition state.

```marksy
h(Example, { name: "api/statecharts_on" })
```

## nested
A nested statechart will operate within its parent transition state. The means when the parent transition state is entered or exited any defined **entry** and **exit** actions will be run. When the parent enters its transition state the **initial** state of the child statechart will be activated.

```marksy
h(Example, { name: "api/statecharts_nested" })
```



