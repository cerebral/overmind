# Using Overmind with Angular

Using Overmind with Angular is straight forward. You create a **connect** decorator and use it with whatever component. An **overmind** property is added to the component and there you can access state, actions and listen to mutations to do effects.

```marksy
h(Example, { name: "guide/usingovermindwithangular/connect" })
```


## Rendering

When you connect Overmind to a component it will use its lifecycle hooks to manage updates. By default you really do not have to think about this as it relies on Angulars default change detection strategy.You can change this behaviour though. By adding the **onPush** strategy and injecting the **ChangeDetectorRef**, the component will only update when it receives input from its parents or Overmind tells it to update due to tracked state has changed.

```marksy
h(Example, { name: "guide/usingovermindwithangular/onpush" })
```

```marksy
h(Notice, null, "The class property has to be named **cdr**. Overmind gives an error if you use onPush strategy without injecting ChangeDetectorRef correctly.")
```

## Passing state as input

If you pass a state object or array as a property to a child component you will also in the child component need to **connect**. This ensures that the property you passed is tracked within that component, even though you do not access any state or actions from Overmind. The devtools will help you identify where any components are left "unconnected".

```marksy
h(Example, { name: "guide/usingovermindwithangular/passprop" })
```

## OvermindProvider

To run effects in components based on changes to state you use the **addMutationListener** function in the lifecycle hooks of Angular.

```marksy
h(Example, { name: "guide/usingovermindwithangular/effect" })
```