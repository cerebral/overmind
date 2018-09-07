# Creating actions

When an event triggers in your application, that being a user interaction, a websocket message etc., you want to run logic that changes the state of the application and/or runs side effects. This logic we express with a concept called **actions**. What is important to understand about actions is that they are an orchestration tool. That means you use actions to compose together different small pieces of logic into a flow of execution. This separation pushes you into a functional approach, giving you several benefits that will be highlighted in this guide.

## Action factory

You define your actions in files named **actions**. From this file you export functions that will receive the action factory function as its only argument.

```marksy
h(Example, { name: "guide/creatingactions/factory" })
```

When you call this action factory you create the action. Now... why do we have this factory? Why could you not just do something like this:

```marksy
h(Example, { name: "guide/creatingactions/instead" })
```

1. We want actions to be defined as a callback. This allows actions to compose actions from other files, even in circular reference. This is an important flexibility which callbacks enable
2. Since actions can be composed into other actions we want to ensure that every composition is unique. By using an action factory we ensure this
3. Overmind is built with Typescript and this affects the surface API to properly do typing

This might not make too much sense right now, but it will become more clear as we move on in this guide.

## A chaining API

The action returned by the factory has a chaining API. This is the concept that forces you into a functional world. One of the big benefits of this approach is that your code becomes declarative. That means you describe **what** your application is doing in the action chain and then you have small separate functions that actually describes the **how**.

```marksy
h(Example, { name: "guide/creatingactions/chain" })
```

Each of the methods on the action we call an **operator**. So **mutation** and **map** are operators.

## Calling an action

When the application is initialized you can start calling the actions. You will typically **connect** your app to components before doing this, but you can also call them directly off the application instance. Let us do that now to show how actions behave.

```marksy
h(Example, { name: "guide/creatingactions/trigger" })
```

Here we have three different examples of actions.

1. **actionA** is called without a value and maps to a new value
2. **actionB** is also called without a value, but maps to a promised value
3. **actionC** is called with a value and that value is transformed

What to learn from this is that calling an action is just like calling a plain function that returns its input by default. It is the attaching of operators that gives the action behaviour.

## Changing state

The most common thing you will do is changing the state of the application. You perform a **mutation**. To express this in an action you will use the **mutation** operator. You will define all your mutations in their own files called **mutations**. The reason for that is to be explicit about where mutations actually happens in your application.

```marksy
h(Example, { name: "guide/creatingactions/mutations" })
```

As the example shows above there are three ways to change the state of the application:

1. Using an explicit value
2. Using a value passed to the action
3. Using a value from the state tree

Note that when you use an existing value from the state tree that value has to be a "plain value", meaning that it can not be an existing array or object. It has to be a string, number, boolean or null. The reason is that in a single state tree you should not have the same object or array in multiple parts of the tree. That would break the tracking of changes. Do not worry though, this is very uncommon to do and if you do it, an error is thrown.

## Composing actions

A powerful concept in Overmind is that you can compose actions together. There are several operators that supports this. We will look at one of those operators here, the **when** operator.

```marksy
h(Example, { name: "guide/creatingactions/composing" })
```

Since each action is defined with a function we call that function and pass it the action factory. This ensures that every composition is unique. Also since each function is defined as a function we can now import actions from anywhere else, even circular imports.

## Summary

This guide gave you some insight into what actions are about. There are still a lot of operators to look into and you can learn more about them in the [side effects]() or go to the [API](http://localhost:4000/api/action) section for actions.

