# Using Overmind with Angular

Using Overmind with Angular is straight forward. You create a **service** and use it with whatever component. By using the **select** API you create observable state.

```marksy
h(Notice, null, "Make sure that your transpile target is configured to **ES2015** or later. This allows you to extend the service correctly")
```

Let us have a look at how you create the service an expose it to components:

```marksy
h(Example, { name: "guide/usingovermindwithangular/connect" })
```

The **service** is responsible for exposing the configuration of your application and manage notifying the component when tracked state changes. The **Track** decorator primarily helps you with debugging, but also manages transferring tracking between components when it is passed as input. If you forget to any of these parts Overmind will yell at you.

```marksy
h(Example, { name: "guide/usingovermindwithangular/connect_custom" })
```

You can now access the **admin** state and actions directly with **state** and **actions**.

## Rendering

When you connect Overmind to your component and expose state you do not have to think about how much state you expose. The exact state that is being accessed in the template is the state that will be tracked. That means you can expose all the state of the application to all your components without worrying about performance.


## Passing state as input

When you pass state objects or arrays as input to a child component that state will by default be tracked on the component passing it a long, which you can also see in the devtools. By just adding the **service** to the child components as well this tracking is transferred to the child component.

```marksy
h(Example, { name: "guide/usingovermindwithangular/passprop" })
```

What is important to understand here is that Overmind is **not** immutable. That means if you would change any property on any todo, only the component actually looking at the todo will render. The list is untouched. 

## State effects

To run effects in components based on changes to state you use the **addMutationListener** function in the lifecycle hooks of Angular.

```marksy
h(Example, { name: "guide/usingovermindwithangular/effect" })
```