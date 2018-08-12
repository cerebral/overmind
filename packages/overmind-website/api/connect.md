# Connect

```marksy
<Example name="api_connect" view/>
```

When you instantiate an Overmind application it exposes the ability to connect components to the state and actions defined. This is simply done by using the **connect** function and pass in the component.

Any state you access in the component is automatically tracked by Overmind and the component will rerender when there is a change.