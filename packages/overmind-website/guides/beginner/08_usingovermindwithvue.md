# Using Overmind with Vue

You can connect any Vue component to your Overmind instance.

```marksy
h(Example, { name: "guide/usingovermindwithvue/connect" })
```

You can also expose parts of the configuration on custom properties of the component:

```marksy
h(Example, { name: "guide/usingovermindwithvue/connect_custom" })
```

You can now access the **admin** state and actions directly with **state** and **actions**.


## Rendering
Any state accessed in the component will cause the component to render when a mutation occurs on that state. Overmind actually uses the same approach to change detection as Vue itself.

## Pass state as props

If you pass a state object or array as a property to a child component you will also in the child component need to **connect**. This ensures that the property you passed is tracked within that component, even though you do not access any state or actions from Overmind. The devtools will help you identify where any components are left "unconnected".

```marksy
h(Example, { name: "guide/usingovermindwithvue/passprops" })
```

## OvermindProvider

To run effects in components based on changes to state you use the **addMutationListener** function in the lifecycle hooks of Vue.

```marksy
h(Example, { name: "guide/usingovermindwithvue/effect" })
```