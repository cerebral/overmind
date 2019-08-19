# Using Overmind with Angular

To use Overmind with Angular you just have to expose the **OvermindModule** and the instance of Overmind.

Let us have a look at how you configure your app:

```marksy
h(Example, { name: "guide/usingovermindwithangular/connect" })
```

The **service** is responsible for exposing the configuration of your application. The **\*track** directive is what does the actual tracking. Just put it at the top of your template and whatever state you access will be optimally tracked. You can also select a namespace from your state to expose to the component:

```marksy
h(Example, { name: "guide/usingovermindwithangular/connect_custom" })
```

You can now access the **admin** state and actions directly with **state** and **actions**.

## NgZone

Since Overmind knows when your components should update you can safely turn **ngZone** to `"noop"`. Note that other 3rd party libraries may not support this.


## Rendering

When you connect Overmind to your component and expose state you do not have to think about how much state you expose. The exact state that is being accessed in the template is the state that will be tracked. That means you can expose all the state of the application to all your components without worrying about performance.

## Passing state as input

When you pass state objects or arrays as input to a child component that state will by default be tracked on the component passing it along, which you can also see in the devtools. By just adding the **\*tracker** directive to the child template, the tracking will be handed over:

```marksy
h(Example, { name: "guide/usingovermindwithangular/passprop" })
```

What is important to understand here is that Overmind is **not** immutable. That means if you would change any property on any todo, only the component actually looking at the todo will render. The list is untouched. 

## State effects

To run effects in components based on changes to state you use the **addMutationListener** function in the lifecycle hooks of Angular.

```marksy
h(Example, { name: "guide/usingovermindwithangular/effect" })
```
