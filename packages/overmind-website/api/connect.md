# Connect

```marksy
h(Example, { name: "api/connect" })
```

When you instantiate an Overmind application it exposes the ability to connect components to the state and actions defined. This is simply done by using **connect**.

Any state you access in the component is automatically tracked by Overmind and the component will rerender when there is a change.