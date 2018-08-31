# Connecting components

Now that you have state defined, describing your application, you want to transform that state into a user interface. There are many ways to express this and Overmind supports the most popular libraries and frameworks for doing this transformation, typically called a view layer. You can also implement a custom view layer if you want to.

The Overmind application instance has a **connect** method and this is used to connect components to the application, exposing the state defined.

```marksy
<Example name="guide/connectingcomponents/connect" view/>
```

In this example we are accessing the **isLoading** state. When this component renders and this state is accessed, Overmind will automatically understand that this component is interested in this exact state. That means whenever the value is changed this component will render again.

## Tracking access

When Overmind detects that the **App** component is interested in our **isLoading** state, it is not looking at the value itself, it is looking at the path. The component pointed to **state.isLoading**, which means when a mutation occurs on that path in the state, the component will render again. Since the value is a boolean value this can only happen when **isLoading** is replaced or removed. The same goes for strings and numbers as well.

The story is a bit different if the state value is an object or an array though. These values can not only be replaced and removed, they can also change. En object can have keys added or removed. An array can have items added, removed and change order of items. Overmind knows this and will notify components respectively.

### Arrays



### Objects