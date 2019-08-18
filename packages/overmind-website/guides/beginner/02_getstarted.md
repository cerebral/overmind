# Get started with Overmind

If you are moving from an existing state management solution, please read the release article [Reducing the pain of developing apps](https://medium.com/@christianalfoni/reducing-the-pain-of-developing-apps-cd10b2e6a83c).

To get started with Overmind you have to set up a project. You can do this with whatever tool your framework of choice provides or you can use [webpack](https://webpack.js.org/) or [parceljs](https://parceljs.org/). You can also use [codesandbox.io](https://codesandbox.io/) to play around with Overmind directly in the browser.

```marksy
h(Notice, null, "Due to using the Proxy feature of JavaScript, Overmind does not support **Internet Explorer 11**. Though did you know IE 11 mode is coming to [Microsoft's next browser](https://www.pcworld.com/article/3393198/microsoft-edge-ie-mode.html)?")
```


When you have your project up and running, install the Overmind dependency by using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/):

```marksy
h(Example, { name: "guide/getstarted/install" })
```

```marksy
h(TypescriptNotice, null, "Overmind requires Typescript version **3.2** or above")
```

Great, we are good to go!

## Our first state

Applications are about state and we are going to introduce our first state, **count**. But we are not going to introduce this state through a component. We are going to take on the perspective of [UI as an implementation detail](https://medium.com/@christianalfoni/ui-as-an-implementation-detail-7fb9f952fb43).

Let us create an instance of Overmind in our code. We define our application configuration in an **overmind** folder and instantiate Overmind in our main **entry** file:

```marksy
h(Example, { name: "guide/getstarted/createapp" })
```

Now that we have our instance make sure the application is running and open up the Overmind devtool either in VS Code or using the standalone app:

```marksy
h(Example, { name: "guide/getstarted/run_devtool" })
```

The devtools should respond when you open up your application:

![open_devtool](/images/devtool_state.png)

Now that we have our state in place, let's change it.

## Changing state

In Overmind you define your logic as **actions**. The action we are going to create should receive a number that we use to change the current count state.

```marksy
h(Example, { name: "guide/getstarted/changestate" })
```

To trigger this action, go to the **actions** tab in the development tool and run both actions to see how they affect the state. As we can see, the count state changed as expected.

![open_devtool](/images/devtool_change.png)


## Creating effects

State management tools have a tendency to end their introduction here, but Overmind helps you manage one more important ingredient, **effects**. An effect, or side effect, is everything from doing HTTP requests to storing data in local storage. What Overmind helps you with is separating the generic low level APIs of using effects from your actual application logic inside actions. Let us look at an example. We are simply going to grab a random number from "somewhere out there":

```marksy
h(Example, { name: "guide/getstarted/effect" })
```

As you can see we separated the low level generic code of creating a random number from our actual application logic in the action. Think of effects as the API you custom tailor to your application. There are several benefits to effects, which you can read about later, but the really important thing is that you separate the tools you are using from your actual application. That means you can at any time replace this custom random number generator with some existing tool or maybe you will grab it from the server? This is also true for everything else. If your application needs posts you will create a **getPosts** effect. It does not matter to the application if this comes from a restful API, GraphQL or whatever other source. It is an implementation detail.

With our effect in place, let us run the actions again:

![open_devtool](/images/devtool_effect.png)

## Implementing UI

Now that we know our application works as expected we can actually produce the UI for it. It does not matter what UI layer we use and with this approach we can easily change it later. We could even run the same app on different UI layers, like native. That means the UI also becomes an implementation detail.

```marksy
h(Example, { name: "guide/getstarted/connectapp" })
```

Now you can run the actions by clicking the buttons in the UI and the devtool continues to track their execution giving you valuable insight into what happens inside your app.

## Hot Module Replacement

A popular concept introduced by Webpack is [HMR](https://webpack.js.org/concepts/hot-module-replacement/). It allows you to make changes to your code without having to refresh. Overmind automatically supports HMR. That means when **HMR** is activated Overmind will make sure it updates and manages its state, actions and effects. Even the devtools will be updated as you make changes.

## Summary

You have now stepped your toes into Overmind. We introduced Overmind with the concept of thinking of the UI as an implementation detail, but it is totally up to you how you want to separate the responsibilities of states and logic in your application. Please continue reading guides to learn more about how Overmind scales.
