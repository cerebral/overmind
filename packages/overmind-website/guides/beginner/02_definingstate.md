# Defining state

Typically we think of the user interface as the application itself. But the user interface is really just there to allow a user to interact with the application. This interface can be anything. A browser window, native, sensors etc. It does not matter what the interface is, the application is still the same. 

The mechanism of communicating from the application to the user interface is called **state**. A user interface is created by **transforming** the current state. To communicate from the user interface to the application an API is exposed, called **actions** in Overmind. Any interaction can trigger an action which changes the state, causing the application to notify the user interface about any updated state.

![state-ui](/images/state-ui.png)

## The values

In JavaScript we can create all sorts of abstractions to describe values, but in Overmind we lean on the core serializable values. These are **objects**, **arrays**, **strings**, **numbers**, **booleans** and **null**. Serializable values means that we can easily convert the state into a string and back again. This is fundamental for creating great developer experiences, passing state between client and server and other features. You can describe any application state with these core values.

Let us talk a little bit about what each value helps us represent in our application.

### Undefined
You might wonder why **undefined** is not part of the core value types. Well, there are two reasons:

1. It is not a serializable value. That means if you explicitly set a value to *undefined* it will not show up in the devtools
2. Undefined values can not be tracked. That means if you were to iterate an object and look at the keys of that object, any undefined
values will not be tracked. This can cause unexpected behaviour

```marksy
h(TypescriptNotice, null, `When writing Typescript you should **not** use optional values for your state (**?**), or use **undefined** in a union type. In a serializable state store world **null** is the value indicating *"there is no value"*.

\`\`\`ts
type State = {
  // Do not do this
  foo?: string

  // Do not do this
  foo: string | undefined
  
  // Do this
  foo: string | null
  
  // Or this, if there always will be a value there
  foo: string
}

export const state: State = {
  foo: null
}
\`\`\`

`)
```

### Naming

Each value needs to sit behind a name. Naming can be difficult, but we have some help. Even though we eventually do want to consume our application through a user interface we ideally want to avoid naming things specifically related to the environment where we show the user interface. Things like **page**, **tabs**, **modal** etc. are specific to a browser experience, maybe related to a certain size. We want to avoid those names as they should not dictate which elements are to be used with the state, that is up to the user interface to decide later. So here are some generic terms to use instead:

- page: **mode**
- tabs: **sections**
- modal: **editUser.active**

### Objects

The root value of your state tree is an object, because objects are great for holding other values. An object has keys that point to values. Most of these keys point to values that are the actual state of the application, but these keys can also represent domains of the application. A typical state structure could be:

```marksy
h(Example, { name: "guide/definingstate/objects" })
```

### Arrays

Arrays are similar to objects in the sense that they hold other values, but instead of keys pointing to values you have indexes. That means it is ideal for iteration. But more often than not objects are actually better at managing lists of values. We can actually do fine without arrays in our state. It is when we produce the actual user interface that we usually want arrays. You can learn more about this in the [managing lists](/guides/intermediate/01_managinglists) guide.

### Strings

Strings are of course used to represent text values. Names, descriptions and whatnot. But strings are also used for ids, types, etc. Strings can be used as values to reference other values. This is an important part in structuring state. For example in our **objects** example above we chose to use an array to represent the modes, using an index to point to the current mode, but we could also do:

```marksy
h(Example, { name: "guide/definingstate/strings" })
```

Now we are referencing the current mode with a string. In this scenario you would probably stick with the array, but it is important to highlight that objects allow you to reference things by string, while arrays reference by number.

### Numbers

Numbers of course represent things like counts, age, etc. But just like strings, they can also represent a reference to something in a list. Like we saw in our **objects** example, to define what the current mode of our application is, we can use a number. You could say that referencing things by number works very well when the value behind the number does not change. Our modes will most likely not change and that is why an array and referencing the current mode by number, is perfectly fine.

### Booleans

Are things loading or not, is the user logged in or not? These are typical uses of boolean values. We use booleans to express that something is activated or not. We should not confuse this with **null**, which means "not existing". We should not use **null** in place of a boolean value. We have to use either `true` or `false`.

### Null

All values, with the exception of booleans, can also be **null**. Non-existing. You can have a non-existing object, array, string or number. It means that if we haven't selected a mode, both the string version and number version would have the value **null**.

## Deriving state


### Getter

A concept in Javascript called a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) allows you to intercept accessing a property in an object. A getter is just like a plain value, it can be added or removed at any point. Getters do **not** cache the result for that very reason, but whatever state they access is tracked.

```marksy
h(Example, { name: "guide/definingstate/getter" })
```

### Cached getter

When you need to do more heavy calculation or combine state from different parts of the tree you can use a plain function instead. Overmind treats these functions like a **getter**, but the returned value is cached and they can also access the root state of the application. A simple example of this would be:

```marksy
h(Example, { name: "guide/definingstate/derived" })
```

```marksy
h(TypescriptNotice, null, "Is is important that you define your state with a **type**, do **NOT** use an **interface**")
```

The first argument of the function is the state the derived function is attached to. A second argument is also passed and that is the root state of the application, allowing you to access whatever you would need. Two important traits of the derived function is:

1. The state accessed is tracked
2. The value returned is cached

That means the function only runs when accessed and the depending state has changed since last access.

```marksy
h(Notice, null, "Even though derived state is defined as functions you consume them as plain values. You do not have to call the derived function to get the value. Derived state can not be dynamically added. They have to be defined and live in the tree from start to end of your application lifecycle.")
```

### Dynamic getter

Sometimes you want to derive state based on some value coming from the user interface. You can do this by creating a function that returns a function. For example you want to be able to select records in a table and calculate some data based on that:

```marksy
h(Example, { name: "guide/definingstate/derived_passvalue" })
```

## References

When you add objects and arrays to your state tree, they are labeled with an "address" in the tree. That means if you try to add the same object or array in multiple spots in the tree you will get an error, as they can not have multiple addresses. Typically this indicates that you'd rather want to create a reference to an existing object or array.

So this is an example of how you would **not** want to do it:

```marksy
h(Example, { name: "guide/definingstate/reference" })
```

You'd rather have a reference to the user id, and for example use a **getter** to grab the actual user:

```marksy
h(Example, { name: "guide/definingstate/reference_correct" })
```

## Exposing the state

We define the state of the application in **state** files. For example, the top level state could be defined as:

```marksy
h(Example, { name: "guide/definingstate/define" })
```

```marksy
h(TypescriptNotice, null, "Is is important that you define your state with a **type**, do **NOT** use an **interface**")
```

To expose the state on the instance you can follow this recommended pattern:

```marksy
h(Example, { name: "guide/definingstate/bringtogether" })
```

## Summary

This short guide gave you some insight into how we think about state and what state really is in an application. There is more to learn about these values and how to use them to describe the application. Please move on to other guides to learn more.
