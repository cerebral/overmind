# Connecting components

Now that you have state defined, describing your application, you want to transform that state into a user interface. There are many ways to express this and Overmind supports the most popular libraries and frameworks for doing this transformation, typically called a view layer. You can also implement a custom view layer if you want to.

By installing the view layer of choice you will get access to a **connect** function and this is used to connect components to the application, exposing the state and actions defined.

```marksy
h(Example, { name: "guide/connectingcomponents/connect" })
```

In this example we are accessing the **isLoading** state. When this component renders and this state is accessed, Overmind will automatically understand that this component is interested in this exact state. That means whenever the value is changed this component will render again.

## State

When Overmind detects that the **App** component is interested in our **isLoading** state, it is not looking at the value itself, it is looking at the path. The component pointed to **state.isLoading**, which means when a mutation occurs on that path in the state, the component will render again. Since the value is a boolean value this can only happen when **isLoading** is replaced or removed. The same goes for strings and numbers as well. We do not say that we mutate a string, boolean or a number. We mutate the object or array that holds those values.

The story is a bit different if the state value is an object or an array. These values can not only be replaced and removed, they can also mutate themselves. An object can have keys added or removed. An array can have items added, removed and even change order of items. Overmind knows this and will notify components respectively. Let us look at how Overmind treats the following scenarios to get a better understanding.

### Arrays

When we just access an array in a component it will rerender if the array itself is replaced, removed or we do a mutation to it. That would mean we push a new item to it, we splice it or sort it.

```marksy
h(Example, { name: "guide/connectingcomponents/array_1" })
```

But what happens if we iterate the array and access a property on each item?

```marksy
h(Example, { name: "guide/connectingcomponents/array_2" })
```

Now Overmind also sees that this component is interested in the id and title of every item. Meaning that if any id or title changes this component would render again. This is perfectly okay for the most part, but if each child renders a complex UI in itself it is a good idea to separate it into its own component. That means each item from the array will be passed to a component as a prop.

```marksy
h(Example, { name: "guide/connectingcomponents/array_3" })
```

The benefit now is that the **List** component will only render when there is a change to the actual list. While each individual **Item** component will render when its respective title changes.

```marksy
h(Notice, {}, "Take notice that our **Item** component still has to connect to Overmind, even though we did not explicitly access any state or actions. That is because Overmind needs to connect to the component to track how it accesses state passed as props as well."
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

## Actions

All the actions defined in the Overmind application is available to connected components. When Overmind consumes an action defined it will produce a function for components to call.

```marksy
h(Example, { name: "guide/connectingcomponents/actions" })
```

```marksy
h(Notice, null, "If you need to pass multiple values to an action, you rather use an **object** instead")
```

## Reactions

Sometimes you want to make something happen inside a component related to a state change. This is typically doing some manual work on the DOM. When you connect a component to overmind it also gets access to **addMutationListener**. This function allows you to subscribe to changes in state, mutations as we call them. Each mutation holds information about what kind of mutation it was, at what path it happened and even any arguments used in the mutation. You can use all this information to create an effect.

This example shows how you can scroll to the top of the page every time you change the current article of the app.

```marksy
h(Example, { name: "guide/connectingcomponents/effects" })
```

## Effects

Any effects you define in your Overmind application is also exposed to the components. They can be found on the property **effects**. It is encouraged that you keep your logic inside actions, but you might be in a situation where you want some other relationship between components and Overmind. A shared effect is the way to go.