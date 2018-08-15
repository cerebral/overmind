# Get started with Overmind

Before you fire up your first Overmind application be sure to check out the [Why Overmind?]() guide.

To get going with Overmind you have to set up a project. You can do this with [webpack]() or [parceljs]() on your local machine, or go to [codesandbox.io]() to play around with Overmind directly in the browser.

When you have your project up and running install the Overmind dependency by using [npm]() or [yarn]():

```marksy
<Example name="guide_getstarted_install" view />
```

Great, we are good to go! In this guide we will create a very simple application to get you into the vocabulary and API of Overmind.

## Our first state

Applications are about state and we are going to introduce our first state, **isLoadingPosts**. Typically you would be tempted to isolate this state in your component, but this is exactly what Overmind discourages. In Overmind you rather define the state of your application outside of your view layer. This gives you several benefits which will become clear as we move on.

In your component we are going to imagine that we recieve the Overmind application:

```marksy
<Example name="guide_getstarted_loadingposts" view />
```

This will of course result in an error. To make this work we have to create an Overmind application instance.

```marksy
<Example name="guide_getstarted_createapp" view />
```

We add the state to a new application instance and export the **connect** function. This function is how you connect your application to components. Let us do that now.

```marksy
<Example name="guide_getstarted_connectapp" view />
```

## Loading posts

We want to load some posts from [jsonplaceholder]() when the **Posts** component mounts. To run logic in Overmind you trigger **actions**. Let us define an action that is responsible for getting our application up and running.

```marksy
<Example name="guide_getstarted_actions" view />
```

As you can see we have not really written any logic yet, we are just describing what we want to happen. This is what we call **declarative** code and is a concept in programming used to manage complexity. In this application it might seem unnecessary, but it is very important to manage complexity as your application grows.

## Mutations

```marksy
<Example name="guide_getstarted_mutations" />
```

Functions used with the **mutate** operator are passed the current state of the application and the current value of the action. These functions are the only functions allowed to change the state of your application. This restriction combined with being just a simple function gives you several benefits as you will learn more about diving into Overmind.

## Operations

All logic that is not related to changing the state of the application is considered an operation. These functions has different signatures based on what **operator** consumes it in an action. In this example we are using the **map** operator which expects a function that receives all the **effects** configured for your application and the current value of the action.

```marksy
<Example name="guide_getstarted_operations" />
```

By default the **effects** holds the state of the application, but we want to extend it with a **jsonPlaceholder** api. Let us look at effects.

## Effects

```marksy
<Example name="guide_getstarted_effects" view />
```

You can expose any kind of side effects to your Overmind instance. Think of it as injecting libraries and tools. So this could for example be the [axios]() library itself, some class instance you create or just a plain object as we see in this example. 

## Devtools

All of this is pretty okay. You might not see the benefits of writing your application code this way and that is prefectly okay. You have to reach a certain level of complexity to really understand it. But let us give you one big benefit right out of the box. In your **package.json** file add the following and the run the script.

```marksy
<Example name="guide_getstarted_devtools" />
```

The Overmind devtools is a pretty amazing experience. You get insight into all the state, changes to that state, actions run, side effects run and general stats. This visual overview becomes more and more valuable as well as complexity increases in your application. 

To connect to the devtools simply add the option to your application:

```marksy
<Example name="guide_getstarted_devtoolsConnect" />
```