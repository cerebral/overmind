# Connect

```marksy
h(Example, { name: "api/connect" })
```

The **connect** function you created is used to connect components to your application. Any state you access in the component is automatically tracked by Overmind and the component will rerender when there is a change.

## addMutationListener

You also have access to manually react to changes in the state. This gives you a lot of flexibility as you can react to type of change and at what path. You can even pattern match the path to react to nested changes etc.

```marksy
h(Example, { name: "api/connect_listener" })
```