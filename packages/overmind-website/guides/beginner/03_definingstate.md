# Defining state

Even though we think of the user interface as the application, it is not. The user interface is just an interface for users to interact with the actual application. So what is the actual application? The actual application is a data structure with values. This data structure with values is the **state** of the application. You might split this up into different components, different store classes or a single state tree. No matter, this is what you need to consume to produce a UI.

The application operates by listening to interactions from the user to change this data structure. The data structure is passed to some view library which transforms this data structure into a user interface. Whenever the state changes, a new transformation is made. This is what we mean when we say that "the state drives the user interface".

![state-ui](/images/state-ui.png)

## The values

In JavaScript we can create all sorts of abstractions to describe values, but in Overmind we lean on the core serializable values. These are **objects**, **arrays**, **strings**, **numbers**, **booleans** and **null**. Serializable values means that we can easily convert the state into a string and back again. This is fundamental for creating great developer experiences, passing state between client and server and other features. You can describe any application state with these core values.

Let us talk a litte bit about what each value helps us represent in our application.

### Objects

The root value of your state tree is an object, because objects are great for holding other values. An object has keys that points to values. Most of these keys points to values that is used to produce a UI, but these keys can also represent domains of the application. A typical state structure could be:

```marksy
h(Example, { name: "guide/definingstate/objects" })
```

### Arrays

Arrays are in a way similar to objects in the sense that they hold other values, but instead of keys pointing to values you have indexes. That means it is ideal for iteration. But more often than not objects are actually better at managing lists of values. We can actually do fine without arrays in our state. It is when we produce the actual user interface that we usually want arrays. You can learn more about this in the [managing lists](/guides/intermediate/01_managinglists) guide.

### Strings

Strings are of course used to represent text values. Names, descriptions and what not. But strings are also used for ids, types, etc. Strings can be used as values to reference other values. This is an important part in structuring state. For example in our **objects** example above we chose to use an array to represent the tabs, using an index to point to the current tab, but we could also do:

```marksy
h(Example, { name: "guide/definingstate/strings" })
```

Now we are referencing the current tab with a string. In this scenario you would probably stick with the array, but it is important to highlight that objects allows you to reference things by string, while arrays reference by number.

### Numbers

Numbers of course represents things like counts, age, etc. But just like strings, they can also represent a reference to something in a list. Like we saw in our **objects** example, to define what the current tab of our application is, we can use a number. You could say that referencing things by number works very well when the value behind the number does not change. Our tabs will most likely not change and that is why an array and referencing the current tab by number, is perfectly fine.

### Booleans

Are things loading or not, is the user logged in or not ? These are typical usages of boolean values. We use booleans to express that something is activated or not. We should not confuse this with **null**, which means "not existing". We should not use **null** in place of a boolean value. We have to use either `true` or `false`.

### Null

All values, with the exception of booleans, can also be **null**. Non existing. You can have a non existing object, array, string or number. That means if we have not selected a tab both the string version and number version would have the value **null**.

## Getter

A concept in Javascript called a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) allows you to intercept accessing a property in an object. A getter is just like a plain value, it can be added an removed at any point. Getters does **not** cache the result for that very reason, but whatever state they access is tracked.

```marksy
h(Example, { name: "guide/definingstate/getter" })
```

## Deriving state

When you need to do more heavy calculation or combine state from different parts ot the tree you can use **derived state**. A simple example of this would be:

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
h(Notice, null, "Even though derived state is defined as functions you consume them as plain values. You do not have to call the derived function to get the value")
```

You might intuitively want to pass in an argument to this derived function, but that is actually a very problematic concept that can be solved more elegantly. An example of this would be that you open a page showing the current user and with the **id** of that user you want find the related posts. So you might want to:


```marksy
h(Example, { name: "guide/definingstate/derived_passvalue" })
```

But this is actually a really bad idea and there are a couple of reasons for that:

1. We need a mechanism to use the argument passed in as a caching key. With an **id** that is not so difficult, but what if you passed in an object with some options? Or maybe you use the same object multiple times, but the values on the object changed? Should we stringify the object? What about multiple arguments? As you can understand it becomes quite complex
2. When should we remove a cached value? We have no idea when you have stopped using the derived value, so we do not know when to remove it. We could have created a limited cache, though how big should it be? 10 entries? What if you have a list of 100 users? Should it be configurable?

So to solve this specific scenario you would rather create a new state called **currentUserId** and use that state to derive the posts. So whenever you have an itch to pass in a value to a derived, try imagine it from the perspective of only using state instead. This also improves the debugging experience.

Also remember that **derived** is a concept for computation heavy derived state, you most commonly want to use a **getter**.

```marksy
h(Notice, null, "Derived state can not be dynamically added. They have to be defined and live in the tree from start to end of your application lifecycle.")
```

## References

When you add objects and arrays to your state tree, they are labeled with an "address" in the tree. That means if you try to add the same object or array in multiple spots in the tree you will get an error, as they can not have multiple addresses. Typically this indicates that you rather want to create a references to an existing object or array.

So this is an example of how you would **not** want to do it:

```marksy
h(Example, { name: "guide/definingstate/reference" })
```

You rather change a reference to the user and for example use a **getter** to grab the actual user:

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
