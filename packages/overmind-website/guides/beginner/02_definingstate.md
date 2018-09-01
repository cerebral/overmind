# Defining state

Even though we think of the user interface as the application, it is really not. The user interface is just an interface for users to interact with the actual application. So what is the actual application? The actual application is a data structure with values. This data structure with values is the **state** of the application.

On one end we listen to interaction from the user to change this data structure. On the other end we transform this data structure into a user interface. This is what we mean when we say that "the state drives the user interface".

```marksy
<Image src="state-ui.png" })
```

## The values

In JavaScript we can create all sorts of abstractions to describe values, but in Overmind we lean on the core serializable values. These are **objects**, **arrays**, **strings**, **numbers**, **booleans** and **null**. Serializable values means that we can easily convert the state into a string and back again. This is fundamental for creating great developer experiences, passing state between client and server and other features. You can describe any application state with these core values.

Let us talk a litte bit about what each value helps you represent in your application.

### Objects

The root value of your state tree is an object, because objects are great for holding other values. An object has keys that points to values. Most of these keys points to values that is used to produce a UI, but these keys can also represent domains of the application. A typical state structure could be:

```marksy
h(Example, { name: "guide/definingstate/objects" })
```

### Arrays

Arrays are in a way similar to objects in the sense that they hold other values, but instead of keys pointing to values you have indexes. That means it is ideal for iteration. But more often than not objects are actually better at managing lists of values. You could actually do quite fine without arrays in your state, it is rather when you produce the actual user interface you want arrays. You can learn more about this in the [managing lists]() guide.

### Strings

Strings are of course used to represent text values. Names, descriptions and what not. But strings are also used for ids, types etc. Basically values used to reference other values. This is an important part in structuring state. For example in our **objects** example above we chose to use an array to represent the tabs, using an index to point to the current tab, but we could also do:

```marksy
h(Example, { name: "guide/definingstate/strings" })
```

Now we are referencing the current tab with a string. In this scenario you would probably stick with the array, but it is important to highlight that objects allows you to reference things by string, while arrays reference by number.

### Numbers

Numbers of course represents things like counts, age etc. But they can also, just like strings, represent a reference to something in a list. Like we saw in our **objects** example, to define what the current tab of our application is, we use a number. You could say that referencing things by number works very well when the value behind the number does not change. Our tabs will most likely not change that is why an array and referencing the current tab by number is perfectly fine.

### Booleans

Are things loading or not, is the user logged in or not. Typical usage of boolean. You use booleans to explicitly express that something is activated or not. This can be confused with **null**, which means "non existing". You would not use the `false` boolean to express that something is non existing. It is just not currently active.

### Null

All values, with the exception of booleans, can also be **null**. Non existing. You can have a non existing object, array, string or number. That means if you had not selected a tab both the string version and number version should have the value **null**.

## Defining state

You define the state of the application in **state** files. For example top level state could be defined as:

```marksy
h(Example, { name: "guide/definingstate/define" })
```

Note that we are just exporting variables from our state module. We use **let** for values that can be replaced and **const** for values that can not be replaced. That would typically be derived or computed values, but you might also have arrays or objects that should not be replaced.

As your application grows you will most likely move state to their own namespaces. An example of that could be:

```marksy
h(Example, { name: "guide/definingstate/namespaces" })
```

## Summary

This short guide gave you some insight into how we think about state and what state really is in an application. There is more to learn about these values and how you can use them to describe your application. Please move on to other guides to learn more.