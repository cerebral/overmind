# Connecting components

Now that you have state defined, describing your application, you want to transform that state into a user interface. There are many ways to express this and Overmind supports the most popular libraries and frameworks for doing this transformation, typically called a view layer. You can also implement a custom view layer if you want to.

By installing the view layer of choice you will get access to a **connect** function and this is used to connect components to the application, exposing the state and actions defined.

```marksy
h(Example, { name: "guide/connectingcomponents/connect" })
```

In this example we are accessing the **isLoading** state. When this component renders and this state is accessed, Overmind will automatically understand that this component is interested in this exact state. That means whenever the value is changed this component will render again.

## Accessing state

When Overmind detects that the **App** component is interested in our **isLoading** state, it is not looking at the value itself, it is looking at the path. The component pointed to **state.isLoading**, which means when a mutation occurs on that path in the state, the component will render again. Since the value is a boolean value this can only happen when **isLoading** is replaced or removed. The same goes for strings and numbers as well. We do not say that we mutate a string, boolean or a number. We mutate the object or array that holds those values.

The story is a bit different if the state value is an object or an array. These values can not only be replaced and removed, they can also mutate themselves. An object can have keys added or removed. An array can have items added, removed and even change order of items. Overmind knows this and will notify components respectively. Let us look at how Overmind treats the following scenarios to get a better understanding.

### Arrays

When we just access en array in a component it will rerender if the array itself is replaced, removed or we do a mutation to it. That would mean we push a new item to it, we splice it or sort it.

```marksy
h(Example, { name: "guide/connectingcomponents/array_1" })
```

But what happens if we iterate the array and access a property on the item?

```marksy
h(Example, { name: "guide/connectingcomponents/array_2" })
```

Now Overmind also sees that this component is interested in the id and title of every item. Meaning that if any id or title changes this component would render again. This is typically not what you want. That is why it is a good idea to pass this item to a child component.

```marksy
h(Example, { name: "guide/connectingcomponents/array_3" })
```

In this situation the **List** component will only render when there is a change to the actual list. While each individual **Item** component will render when its respective title changes.

```marksy
h(Notice, {}, "Take notice that our **Item** component still has to connect to Overmind, even though we did not explicitly access the application. That is because Overmind needs to connect to the component to track how it accesses application state."
)
```

### Objects

Objects are similar to arrays. If you access an object you track if that object is replaced or removed. Also like arrays you can mutate the object itself. When you add, replace or remove a key from the object that is considered a mutation of the object. That means if you just access the object, the component will render if any keys are added, replaced or removed.

```marksy
h(Example, { name: "guide/connectingcomponents/object_1" })
```

And just like an array you can iterate the object keys to pass items to a child component for optimal rendering. 

```marksy
h(Example, { name: "guide/connectingcomponents/object_2" })
```

## Calling actions

All the actions defined in the Overmind application is available to connected components. When Overmind consumes an action defined it will produce a function for components to call.

```marksy
h(Example, { name: "guide/connectingcomponents/actions" })
```
