# Using Overmind with React

There are two different ways to connect Overmind to React. You can either use a traditional **Higher Order Component** or you can use the new **hooks** api to expose state and actions.

When you connect Overmind to a component you ensure that whenever any tracked state changes only components interested in that state will rerender and they will rerender "at their point in the component tree". That means we remove a lot of unnecessary work from React. There is no reason for the whole React component tree to rerender when only one component is interested in a change.

## With HOC
```marksy
h(Example, { name: "guide/usingovermindwithreact/hoc" })
```

### Rendering

When you connect a component with the **connect HOC** it will be responsible for tracking and trigger a render when the tracked state is updated. The **overmind** prop passed to the component you defined holds the state and actions. If you want to detect inside your component that it was indeed an Overmind state change causing the render you can compare the **overmind** prop itself.

```marksy
h(Example, { name: "guide/usingovermindwithreact/hoc_compareprop" })
```

You will not be able to compare a previous state value in Overmind with the new. That is simply because Overmind is not immutable and it should not be. You will not use **shouldComponentUpdate** to compare state in Overmind, though you can of course still use it to compare props from a parent. This is a bit of a mindshift if you come from Redux, but it actually removes the mental burden of doing this stuff.

If you previously used **componentDidUpdate** to trigger an effect, that is no longer necessary either. You rather listen to state changes in Overmind using **addMutationListener** specified below in *effects*.

### Passing state as props

If you pass a state object or array as a property to a child component you will also in the child component need to **connect**. This ensures that the property you passed is tracked within that component, even though you do not access any state or actions from Overmind. The devtools will help you identify where any components are left "unconnected".

```marksy
h(Example, { name: "guide/usingovermindwithreact/hoc_passprop" })
```

### Effects

To run effects in components based on changes to state you use the **addMutationListener** function in the lifecycle hooks of React.

```marksy
h(Example, { name: "guide/usingovermindwithreact/hoc_effect" })
```

## With hook (From version 16.7.0)
```marksy
h(Example, { name: "guide/usingovermindwithreact/hook" })
```

### Rendering

When you use the Overmind hook it will ensure that the component will render when any tracked state changes. It will not do anything related to the props passed to the component. That means whenever the parent renders, this component renders as well. You will need to wrap your component with [**React.memo**](https://reactjs.org/docs/react-api.html#reactmemo) to optimize rendering caused by a parent.

### Passing state as props

If you pass a state object or array as a property to a child component you will also in the child component need to use the **useOvermind** hook to ensure that it is tracked within that component, even though you do not access any state or actions. The devtools will help you identify where any components are left "unconnected".

```marksy
h(Example, { name: "guide/usingovermindwithreact/hook_passprop" })
```

### Effects

The hook effect of React gives a natural point of running effects related to state changes. An example of this is from the Overmind website, where we scroll to the top of the page whenever the current page state changes.

```marksy
h(Example, { name: "guide/usingovermindwithreact/hook_effect" })
```

You can also here use the traditional approach adding a subscription to any updates. This also allows for more granular control as you can check the specific mutations made and/or do pattern matching on the paths updated.

```marksy
h(Example, { name: "guide/usingovermindwithreact/hook_effect_subscription" })
```