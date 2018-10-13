# Get started with Overmind

Before you fire up your first Overmind application you might want to read the release article [There is more to state management than state](https://medium.com/@christianalfoni/there-is-more-to-state-management-than-state-60ad75e24ea6).

To get started with Overmind you have to set up a project. You can do this with [webpack](https://webpack.js.org/) or [parceljs](https://parceljs.org/) on your local machine, or go to [codesandbox.io](https://codesandbox.io/) to play around with Overmind directly in the browser.

When you have your project up and running install the Overmind dependency by using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/):

```marksy
h(Example, { name: "guide/getstarted/install" })
```

Great, we are good to go! In this guide we will create a very simple application, but we will use the conventions for structuring a scalable app. That means we will be creating some files that seem unnecessary, but this is just as important as learning the API.

## Our first state

Applications are about state and we are going to introduce our first state, **isLoadingPosts**. Typically you would be tempted to isolate this state in your component, but this is exactly what Overmind discourages. In Overmind you rather define the state of your application outside of your view layer. This gives you several benefits which will become clear as we move on.

In the component we are going to imagine that we receive the Overmind application:

```marksy
h(Example, { name: "guide/getstarted/loadingposts" })
```

This will of course result in an error. To make this work we have to create an Overmind application instance.

```marksy
h(Example, { name: "guide/getstarted/createapp" })
```

We add the state to our main module and configure that module in our **app.ts** file. In addition to exporting the app itself we export a way to connect to the app. Let us do that now.

```marksy
h(Example, { name: "guide/getstarted/connectapp" })
```

## Loading posts

We want to load some posts from [jsonplaceholder](https://jsonplaceholder.typicode.com/) when the **Posts** component mounts. To run logic in Overmind you trigger **actions**. Let us define an action that is responsible for getting our application up and running.

```marksy
h(Example, { name: "guide/getstarted/actions" })
```

As you can see we have not really written any logic yet, we are just describing what we want to happen. This is what we call **declarative** code and is a concept in programming used to manage complexity. In this application it might seem unnecessary, but it is very important to manage complexity as your application grows.

## Mutations

```marksy
h(Example, { name: "guide/getstarted/mutations" })
```

Functions used with the **mutate** operator are passed the current state of the application and the current value of the action. These functions are the only functions allowed to change the state of your application. This restriction combined with being just a simple function gives you several benefits as you will see when diving deeper into Overmind.

## Operations

All logic that is not related to changing the state of the application is considered an operation. These functions have different signatures based on the **operator** that consumes it in an action. In this example we are using the **map** operator which expects a function. This function is just like the mutation function above, but it will also receives all the **effects** configured for your application.

```marksy
h(Example, { name: "guide/getstarted/operations" })
```

By default the **effects** contain the state of the application, but here, we also want to extend it with a **jsonPlaceholder** api. Let us look at effects.

## Effects

```marksy
h(Example, { name: "guide/getstarted/effects" })
```

We can expose any kind of side effects to our Overmind instance. Think of it as injecting libraries and tools. For example, it could be the [axios]() library itself, some class instance we created or just a plain object as we see in this example. Doing this injection keeps our operation functions pure and Overmind knows when these injected libraries are accessed.

## Devtools

At this stage, the benefits of writing an application code this way might not be obvious. It is usually when we start to deal with more complexity that the benefits become more obvious. But even with a somple app, there is one big benefit that comes right out of the box. In our **package.json** file, we add the following and the run the script.

```marksy
h(Example, { name: "guide/getstarted/devtools" })
```

The Overmind devtools provides us with a pretty amazing experience. We get insights into all the state, changes to that state, actions run, which side effects are run and general stats. This visual overview becomes more and more valuable as complexity increases. 

To connect to the devtools simply start the devtools application and refresh your app.

## Summary

You have now stepped your toes into Overmind. Please continue this example to actually display the posts fetched. In the devtools you will see how the component will become quite bloated with dependencies to state, which is actually a general problem with lists and components. You can read more about how to manage lists in a later guide, but we wanted to point out that the devtools can already helps us identify possible issues with the application.
